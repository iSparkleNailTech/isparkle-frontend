import type {
  ServicesResponse,
  PackagesResponse,
  AvailabilityResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  BookingResponse,
} from "@/types/booking";
import type { UserResponse, UpdateUserRequest } from "@/types/user";
import type { Booking } from "@/data/mockBookings";
import { supabase } from "@/integrations/supabase/client";
import { API_BASE_URL } from "@/config/env";

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = "An error occurred";
    let errorData = null;

    try {
      const errorJson = await response.json();
      errorMessage = errorJson.error?.message || errorMessage;
      errorData = errorJson.error;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }

  return response.json();
}

/**
 * Gets base headers for requests (includes ngrok bypass header)
 */
function getBaseHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    // Bypass ngrok's browser warning page
    "ngrok-skip-browser-warning": "true",
  };
}

/**
 * Gets authorization headers with Supabase token if available
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    ...getBaseHeaders(),
  };

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
      console.log("Authorization header:", headers["Authorization"]);
    }
  } catch (error) {
    // If getting session fails, continue without auth header
    console.warn("Failed to get auth session:", error);
  }

  return headers;
}

export const api = {
  /**
   * Get all service categories
   */
  getServices: async (): Promise<ServicesResponse> => {
    const response = await fetch(`${API_BASE_URL}/services`, {
      headers: getBaseHeaders(),
    });
    return handleResponse<ServicesResponse>(response);
  },

  /**
   * Get packages for a service category
   */
  getPackages: async (serviceCategoryId: string): Promise<PackagesResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/services/${serviceCategoryId}/packages`,
      {
        headers: getBaseHeaders(),
      }
    );
    return handleResponse<PackagesResponse>(response);
  },

  /**
   * Get available time slots for a service and date
   */
  getAvailability: async (
    serviceCategoryId: string,
    packageId: string,
    date: string // YYYY-MM-DD format
  ): Promise<AvailabilityResponse> => {
    const params = new URLSearchParams({
      serviceCategoryId,
      packageId,
      date,
    });
    const response = await fetch(`${API_BASE_URL}/availability?${params}`, {
      headers: getBaseHeaders(),
    });
    return handleResponse<AvailabilityResponse>(response);
  },

  /**
   * Create a booking
   */
  createBooking: async (
    data: CreateBookingRequest
  ): Promise<CreateBookingResponse> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<CreateBookingResponse>(response);
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<{ user: UserResponse }> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers,
    });
    return handleResponse<{ user: UserResponse }>(response);
  },

  /**
   * Update current user profile
   */
  updateCurrentUser: async (
    data: UpdateUserRequest
  ): Promise<{ user: UserResponse }> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse<{ user: UserResponse }>(response);
  },

  /**
   * Get current user's bookings
   */
  getMyBookings: async (): Promise<{ bookings: BookingResponse[] }> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/bookings/me`, {
      headers,
    });
    return handleResponse<{ bookings: BookingResponse[] }>(response);
  },

  /**
   * Get admin bookings with populated service and package data
   */
  getAdminBookings: async (filters?: {
    startDate?: string; // ISO datetime string
    endDate?: string; // ISO datetime string
    status?: 'pending' | 'completed' | 'cancelled';
    serviceCategoryId?: string;
    limit?: number;
    skip?: number;
  }): Promise<{ bookings: Booking[] }> => {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.serviceCategoryId) params.append('serviceCategoryId', filters.serviceCategoryId);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.skip) params.append('skip', filters.skip.toString());

    const queryString = params.toString();
    const url = `${API_BASE_URL}/bookings/admin${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
      headers: getBaseHeaders(),
    });
    return handleResponse<{ bookings: Booking[] }>(response);
  },

  /**
   * Update booking status (complete or cancel)
   */
  updateBookingStatus: async (
    bookingId: string,
    status: 'completed' | 'cancelled'
  ): Promise<{ booking: Booking }> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status }),
    });
    return handleResponse<{ booking: Booking }>(response);
  },
};

export { ApiError };
