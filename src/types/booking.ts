// TypeScript types matching backend API responses

export interface ServiceCategoryResponse {
  _id: string;
  name: string;
  defaultDurationMinutes: number;
  capacity: number;
  isActive: boolean;
  packages: PackageResponse[];
}

export interface PackageResponse {
  _id: string;
  serviceCategoryId: string;
  name: string;
  price: number;
  durationMinutes: number | null;
  isActive: boolean;
}

export interface TimeSlot {
  startTime: string; // ISO date string
  endTime: string; // ISO date string
}

export interface AvailabilityResponse {
  slots: TimeSlot[];
}

export interface CreateBookingRequest {
  serviceCategoryId: string;
  packageId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startTime: string; // ISO date string
  idempotencyKey?: string;
}

export interface BookingResponse {
  _id: string;
  serviceCategoryId: string;
  packageId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingResponse {
  booking: BookingResponse;
  assignedWorker: {
    _id: string;
    name: string;
  };
}

export interface ServicesResponse {
  services: ServiceCategoryResponse[];
}

export interface PackagesResponse {
  packages: PackageResponse[];
}
