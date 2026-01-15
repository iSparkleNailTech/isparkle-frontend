import type {
  ServicesResponse,
  PackagesResponse,
  AvailabilityResponse,
  CreateBookingRequest,
  CreateBookingResponse,
} from "@/types/booking";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

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

export const api = {
  /**
   * Get all service categories
   */
  getServices: async (): Promise<ServicesResponse> => {
    const response = await fetch(`${API_BASE_URL}/services`);
    return handleResponse<ServicesResponse>(response);
  },

  /**
   * Get packages for a service category
   */
  getPackages: async (serviceCategoryId: string): Promise<PackagesResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/services/${serviceCategoryId}/packages`
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
    const response = await fetch(`${API_BASE_URL}/availability?${params}`);
    return handleResponse<AvailabilityResponse>(response);
  },

  /**
   * Create a booking
   */
  createBooking: async (
    data: CreateBookingRequest
  ): Promise<CreateBookingResponse> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse<CreateBookingResponse>(response);
  },
};

export { ApiError };
