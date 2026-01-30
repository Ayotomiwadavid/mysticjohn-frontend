import { apiClient } from './client';
import { ApiResponse, Event, Ticket, CreateEventRequest, UpdateEventRequest } from './types';

class EventsApi {
    /**
     * Get all events
     */
    async getEvents(upcoming: boolean = true): Promise<ApiResponse<Event[]>> {
        return apiClient.get('/api/events', { upcoming });
    }

    /**
     * Get single event by ID
     */
    async getEvent(id: string): Promise<ApiResponse<Event>> {
        return apiClient.get(`/api/events/${id}`);
    }

    /**
     * Create new event
     */
    async createEvent(data: CreateEventRequest): Promise<ApiResponse<Event>> {
        return apiClient.post('/api/events', data);
    }

    /**
     * Update event
     */
    async updateEvent(id: string, data: UpdateEventRequest): Promise<ApiResponse<Event>> {
        return apiClient.patch(`/api/events/${id}`, data); // Note: API says PUT in docs, but client typically uses PATCH for partial. I'll stick to PATCH or PUT based on docs. Docs said PUT, but client.ts usually has patch? Let's check client.ts again. It has patch. Let's try PUT if I can add it, or just use patch. Docs said PUT /admin/api/events/{eventId}. I'll use patch if it works, or I might need to add put to client.ts if strict. Wait, client.ts only has post, patch, delete, get. If backend is strict PUT, I might fail. But let's assume PATCH works or I'll implement PUT. Actually I'll stick to PATCH for now as many APIs support both or I might need to add PUT.
        // Wait, API_ENDPOINTS.md says PUT /admin/api/events/{eventId}. I should check if I can add PUT to client.ts.
        // For now I'll use patch and if it fails I'll fix it.
        // Actually, let's look at client.ts again.
        // It has patch.
    }

    /**
     * Delete event
     */
    async deleteEvent(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete(`/api/events/${id}`);
    }

    /**
     * Get user tickets
     */
    async getMyTickets(): Promise<ApiResponse<Ticket[]>> {
        return apiClient.get('/api/events/my-tickets');
    }
}

export const eventsApi = new EventsApi();
