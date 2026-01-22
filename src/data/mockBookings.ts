export type BookingStatus = 'pending' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  bookingDate: string; // YYYY-MM-DD format
  bookingTime: string; // HH:mm format
  serviceName: string; // Package name
  serviceCategory: string; // Service category name
  duration: string; // Formatted duration (e.g., "1 hr 30 min")
  price: string; // Formatted price (e.g., "$50")
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  status: BookingStatus;
  notes?: string; // Optional notes field
}

// Mock data - will be replaced by API calls
export const mockBookings: Booking[] = [];
