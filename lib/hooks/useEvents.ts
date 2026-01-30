'use client';

import { useState, useCallback } from 'react';
import { eventsApi } from '@/lib/api';
import type { Event, Ticket } from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseEventsReturn {
    events: Event[];
    tickets: Ticket[];
    isLoading: boolean;
    error: string | null;
    fetchEvents: (upcoming?: boolean) => Promise<void>;
    fetchEvent: (id: string) => Promise<Event | null>;
    fetchTickets: () => Promise<void>;
    clearError: () => void;
}

/**
 * Events hook
 * Manages event-related operations and state
 */
export function useEvents(): UseEventsReturn {
    const [events, setEvents] = useState<Event[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await eventsApi.getEvents();
            const eventsData = Array.isArray(data) ? data : (data as any).data || [];
            setEvents(Array.isArray(eventsData) ? eventsData : []);
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError
                    ? err.message
                    : 'Failed to fetch events.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchEvent = useCallback(async (id: string): Promise<Event | null> => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await eventsApi.getEvent(id);
            return data as unknown as Event; // Type assertion if response wrapper is tricky
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError
                    ? err.message
                    : 'Failed to fetch event.';
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchTickets = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await eventsApi.getMyTickets();
            const ticketsData = Array.isArray(data) ? data : (data as any).data || [];
            setTickets(Array.isArray(ticketsData) ? ticketsData : []);
        } catch (err) {
            const errorMessage =
                err instanceof ApiClientError
                    ? err.message
                    : 'Failed to fetch tickets.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        events,
        tickets,
        isLoading,
        error,
        fetchEvents,
        fetchEvent,
        fetchTickets,
        clearError,
    };
}
