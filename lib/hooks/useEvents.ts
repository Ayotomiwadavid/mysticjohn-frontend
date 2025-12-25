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
  fetchEvents: () => Promise<void>;
  fetchEvent: (id: string) => Promise<Event | null>;
  fetchTickets: () => Promise<void>;
  cancelTicket: (id: string) => Promise<void>;
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
      setEvents(data);
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
      return data;
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
      setTickets(data);
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

  const cancelTicket = useCallback(async (id: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await eventsApi.cancelTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to cancel ticket.';
      setError(errorMessage);
      throw err;
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
    cancelTicket,
    clearError,
  };
}

