'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { chatApi } from '@/lib/api';
import type { ChatMessage, SendMessageRequest } from '@/lib/api/types';
import { ApiClientError, getAuthToken } from '@/lib/api/client';
import { io, Socket } from 'socket.io-client';
import { useAuthContext } from '@/contexts/AuthContext';

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  unreadCount: number;
  fetchMessages: (groupId: string, options?: { limit?: number; before?: string }) => Promise<void>;
  sendMessage: (groupId: string, data: SendMessageRequest) => Promise<void>;
  markAsRead: (groupId: string) => Promise<void>;
  fetchUnreadCount: (groupId: string) => Promise<void>;
  clearError: () => void;
  clearMessages: () => void;
}

/**
 * Chat hook with Socket.io integration
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef<Socket | null>(null);
  const currentGroupIdRef = useRef<string | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const socket = io(`${API_URL}/chat`, {
      auth: {
        token: token,
      },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('new-message', (data: { message: ChatMessage }) => {
      setMessages((prev) => {
        // Avoid duplicates
        if (prev.some((m) => m.id === data.message.id)) {
          return prev;
        }
        return [...prev, data.message];
      });
      // Update unread count if not in current group
      if (currentGroupIdRef.current !== data.message.groupId) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    socket.on('error', (data: { message: string }) => {
      setError(data.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const joinGroup = useCallback((groupId: string) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('join-group', groupId);
      currentGroupIdRef.current = groupId;
    }
  }, []);

  const leaveGroup = useCallback(() => {
    if (socketRef.current && currentGroupIdRef.current) {
      socketRef.current.emit('leave-group', currentGroupIdRef.current);
      currentGroupIdRef.current = null;
    }
  }, []);

  const fetchMessages = useCallback(async (groupId: string, options?: { limit?: number; before?: string }) => {
    try {
      setError(null);
      setIsLoading(true);

      // Join the group room
      joinGroup(groupId);

      const data = await chatApi.getMessages(groupId, options);
      setMessages(data);

      // Mark as read after loading
      await chatApi.markGroupAsRead(groupId);
      setUnreadCount(0);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch messages.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [joinGroup]);

  const sendMessage = useCallback(async (groupId: string, data: SendMessageRequest) => {
    try {
      setError(null);

      // Send via socket for real-time delivery
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('send-message', {
          groupId,
          ...data,
        });
      } else {
        // Fallback to REST API if socket not connected
        const message = await chatApi.sendMessage(groupId, data);
        setMessages((prev) => [...prev, message]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to send message.';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const markAsRead = useCallback(async (groupId: string) => {
    try {
      await chatApi.markGroupAsRead(groupId);
      setUnreadCount(0);

      // Also emit via socket
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('mark-read', { groupId });
      }
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to mark messages as read.';
      setError(errorMessage);
    }
  }, []);

  const fetchUnreadCount = useCallback(async (groupId: string) => {
    try {
      const { count } = await chatApi.getUnreadCount(groupId);
      setUnreadCount(count);
    } catch (err) {
      // Silently fail for unread count
      console.error('Failed to fetch unread count:', err);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    leaveGroup();
  }, [leaveGroup]);

  return {
    messages,
    isLoading,
    error,
    isConnected,
    unreadCount,
    fetchMessages,
    sendMessage,
    markAsRead,
    fetchUnreadCount,
    clearError,
    clearMessages,
  };
}

