import { apiClient } from './client';
import type {
  QuickQuestion,
  SubmitQuestionsRequest,
  ReplyToQuestionRequest,
} from './types';

/**
 * Messages API
 */
export const messagesApi = {
  /**
   * Submit multiple questions (1 credit per question)
   */
  submitQuestions: async (data: SubmitQuestionsRequest): Promise<QuickQuestion[]> => {
    return apiClient.post<QuickQuestion[]>('/api/messages', data);
  },

  /**
   * Get user's questions and replies
   */
  getMyQuestions: async (): Promise<QuickQuestion[]> => {
    return apiClient.get<QuickQuestion[]>('/api/messages/my');
  },

  /**
   * Admin: Get all questions
   */
  getAllQuestions: async (): Promise<QuickQuestion[]> => {
    const response = await apiClient.get<any>('/api/messages');
    return Array.isArray(response) ? response : (response.data || response.messages || []);
  },

  /**
   * Admin: Reply to a question
   */
  replyToQuestion: async (id: string, data: ReplyToQuestionRequest): Promise<QuickQuestion> => {
    return apiClient.post<QuickQuestion>(`/api/messages/${id}/reply`, data);
  },
};
