'use client';

import { useState, useCallback } from 'react';
import { eventsApi } from '@/lib/api';
import type { Event, Ticket, EventType } from '@/lib/api/types';
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
 * Normalize backend event into frontend Event shape
 */
const adaptEvent = (e: any): Event => {
    const start = e?.startDateTime ?? e?.date ?? '';
    const online = e?.isOnline ?? (e?.eventType === 'online');
    const meeting = e?.meetingLink ?? e?.googleMeetLink ?? undefined;
    const created = e?.createdAt ?? new Date().toISOString();
    const updated = e?.updatedAt ?? e?.createdAt ?? created;
    const available =
        typeof e?.availableTickets === 'number' ? e.availableTickets
        : typeof e?.availableSlots === 'number' ? e.availableSlots
        : (typeof e?.capacity === 'number' && typeof e?.ticketsSold === 'number'
            ? Math.max(0, e.capacity - e.ticketsSold)
            : undefined);

    return {
        id: e?._id ?? e?.id ?? '',
        _id: e?._id,
        title: e?.title ?? '',
        description: e?.description,
        eventType: e?.eventType as EventType | undefined,
        startDateTime: start,
        endDateTime: e?.endDateTime,
        location: e?.location,
        isOnline: online,
        meetingLink: meeting,
        coverImageUrl: e?.coverImageUrl,
        price: typeof e?.price === 'number' ? e.price : Number(e?.price ?? 0),
        capacity: e?.capacity,
        availableTickets: available,
        isPublished: (typeof e?.isPublished === 'boolean' ? e.isPublished : true),
        createdAt: created,
        updatedAt: updated,
    } as Event;
};

/**
 * Events hook
 * Manages event-related operations and state
 */
export function useEvents(): UseEventsReturn {
    const [events, setEvents] = useState<Event[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async (upcoming: boolean = true) => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await eventsApi.getEvents(upcoming);
            const eventsData = Array.isArray(data) ? data : (data as any).data || [];
            const mappedEvents = Array.isArray(eventsData)
                ? eventsData.map(adaptEvent)
                : [];
            setEvents(mappedEvents);
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
            const eventData = (data as any).data || data;
            return adaptEvent(eventData);
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
            const mappedTickets = Array.isArray(ticketsData)
                ? ticketsData.map((t: any) => ({ ...t, id: t._id || t.id }))
                : [];
            setTickets(mappedTickets);
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
