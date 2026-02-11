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
    // Some endpoints return the event nested under an 'event' property
    const item = e?.event ?? e;

    const start = item?.startDateTime ?? item?.date ?? e?.startDateTime ?? e?.date ?? '';
    const online = item?.isOnline ?? (item?.eventType === 'online') ?? e?.isOnline ?? (e?.eventType === 'online');
    const meeting = item?.meetingLink ?? item?.googleMeetLink ?? e?.meetingLink ?? e?.googleMeetLink ?? undefined;
    const created = item?.createdAt ?? e?.createdAt ?? new Date().toISOString();
    const updated = item?.updatedAt ?? item?.createdAt ?? e?.updatedAt ?? e?.createdAt ?? created;

    // Available tickets might be at the wrapper level or item level
    const available =
        typeof e?.availableTickets === 'number' ? e.availableTickets
            : typeof e?.availableSlots === 'number' ? e.availableSlots
                : typeof item?.availableTickets === 'number' ? item.availableTickets
                    : typeof item?.availableSlots === 'number' ? item.availableSlots
                        : (typeof item?.capacity === 'number' && typeof item?.ticketsSold === 'number'
                            ? Math.max(0, item.capacity - item.ticketsSold)
                            : undefined);

    return {
        id: item?._id ?? item?.id ?? e?._id ?? e?.id ?? '',
        _id: item?._id ?? e?._id,
        title: item?.title ?? e?.title ?? '',
        description: item?.description ?? e?.description,
        eventType: (item?.eventType ?? e?.eventType) as EventType | undefined,
        startDateTime: start,
        endDateTime: item?.endDateTime ?? e?.endDateTime,
        location: item?.location ?? e?.location,
        isOnline: online,
        meetingLink: meeting,
        coverImageUrl: item?.coverImageUrl ?? e?.coverImageUrl,
        price: typeof item?.price === 'number' ? item.price : Number(item?.price ?? e?.price ?? 0),
        capacity: item?.capacity ?? e?.capacity,
        availableTickets: available,
        isPublished: (typeof item?.isPublished === 'boolean' ? item.isPublished : (typeof e?.isPublished === 'boolean' ? e.isPublished : true)),
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
