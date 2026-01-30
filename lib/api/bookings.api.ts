import { apiClient } from './client';
import type {
  Service,
  AvailabilitySlot,
  CreateBookingRequest,
  Booking,
  CreateServiceRequest,
  UpdateServiceRequest,
} from './types';

/**
 * Bookings API
 */
export const bookingsApi = {
  /**
   * Get all active services
   * Backend route: /api/services
   * Transforms backend format (_id, durationMins, active) to frontend format (id, duration, isActive)
   */
  getServices: async (): Promise<Service[]> => {
    const response = await apiClient.get<any[]>('/api/bookings');
    // Transform backend format to frontend format
    return response.map((service: any) => ({
      id: service._id || service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.durationMins || service.duration,
      active: service.active !== undefined ? service.active : service.isActive,
    }));
  },

  /**
   * Get service by ID
   * Backend route: /api/services/:id
   * Transforms backend format to frontend format
   */
  getService: async (id: string): Promise<Service> => {
    const service = await apiClient.get<any>(`/api/bookings/${id}`);
    return {
      id: service._id || service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.durationMins || service.duration,
      active: service.active !== undefined ? service.active : service.isActive,
    };
  },

  /**
   * Get available time slots
   */
  getAvailability: async (
    serviceId: string,
    date: string,
    duration: number
  ): Promise<AvailabilitySlot> => {
    return apiClient.get<AvailabilitySlot>('/api/bookings/available-slots', {
      serviceId,
      date,
      duration,
    });
  },

  /**
   * Create a new booking
   */
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    return apiClient.post<Booking>('/api/bookings', data);
  },

  /**
   * Get user's bookings
   * Transforms backend format (_id) to frontend format (id)
   */
  getMyBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<any[]>('/api/bookings/my');
    // Transform backend format to frontend format
    return response.map((booking: any) => ({
      ...booking,
      id: booking._id || booking.id,
    }));
  },

  /**
   * Get booking by ID
   */
  getBooking: async (id: string): Promise<Booking> => {
    return apiClient.get<Booking>(`/api/bookings/${id}`);
  },

  /**
   * Update booking
   */
  updateBooking: async (id: string, data: Partial<Booking>): Promise<Booking> => {
    return apiClient.patch<Booking>(`/api/bookings/${id}`, data);
  },

  /**
   * Cancel booking
   */
  cancelBooking: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/bookings/${id}`);
  },

  /**
   * Admin: Get all bookings
   */
  getAllBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<any[]>('/api/bookings/admin/all');
    // Transform backend format to frontend format
    return response.map((booking: any) => ({
      ...booking,
      id: booking._id || booking.id,
    }));
  },

  /**
   * Admin: Create Service
   */
  createService: async (data: CreateServiceRequest): Promise<Service> => {
    return apiClient.post<Service>('/api/bookings/services', data);
  },

  /**
   * Admin: Update Service
   */
  updateService: async (id: string, data: UpdateServiceRequest): Promise<Service> => {
    return apiClient.patch<Service>(`/api/bookings/services/${id}`, data);
  },

  /**
   * Admin: Delete Service
   */
  deleteService: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/bookings/services/${id}`);
  },
};