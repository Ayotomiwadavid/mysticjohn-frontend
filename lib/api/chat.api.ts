import { apiClient } from './client';
import type { ChatMessage, SendMessageRequest, GetChatMessagesOptions } from './types';

/**
 * Chat API
 */
export const chatApi = {
  /**
   * Get chat messages for a group
   */
  getMessages: async (groupId: string, options?: GetChatMessagesOptions): Promise<ChatMessage[]> => {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.before) params.append('before', options.before);

    const query = params.toString();
    return apiClient.get<ChatMessage[]>(`/api/groups/${groupId}/chat/messages${query ? `?${query}` : ''}`);
  },

  /**
   * Send a chat message
   */
  sendMessage: async (groupId: string, data: SendMessageRequest): Promise<ChatMessage> => {
    return apiClient.post<ChatMessage>(`/api/groups/${groupId}/chat/messages`, data);
  },

  /**
   * Mark all messages in a group as read
   */
  markGroupAsRead: async (groupId: string): Promise<{ message: string; count: number }> => {
    return apiClient.post<{ message: string; count: number }>(`/api/groups/${groupId}/chat/read`);
  },

  /**
   * Get unread message count for a group
   */
  getUnreadCount: async (groupId: string): Promise<{ count: number }> => {
    return apiClient.get<{ count: number }>(`/api/groups/${groupId}/chat/unread-count`);
  },

  /**
   * Mark a specific message as read
   */
  markMessageAsRead: async (messageId: string): Promise<{ message: string; data: ChatMessage }> => {
    return apiClient.patch<{ message: string; data: ChatMessage }>(`/api/chat/messages/${messageId}/read`);
  },

  /**
   * Delete a chat message
   */
  deleteMessage: async (messageId: string): Promise<void> => {
    return apiClient.delete(`/api/chat/messages/${messageId}`);
  },
};

