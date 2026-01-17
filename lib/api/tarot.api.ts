import { apiClient } from './client';

export interface TarotPick {
  id: string;
  cardId: number;
  cardName: string;
  isReversed: boolean;
  interpretation: string;
  pickedDate: string;
}

export interface DailyPickStatus {
  hasPickedToday: boolean;
  todayPick: TarotPick | null;
}

export interface SavePickRequest {
  cardId: number;
  cardName: string;
  isReversed: boolean;
  interpretation: string;
}

/**
 * Tarot API
 */
export const tarotApi = {
  /**
   * Check if user has picked a card today
   */
  checkDailyPick: async (): Promise<DailyPickStatus> => {
    return apiClient.get<DailyPickStatus>('/api/tarot/check');
  },

  /**
   * Save a tarot card pick
   */
  savePick: async (data: SavePickRequest): Promise<{ message: string; pick: TarotPick }> => {
    return apiClient.post<{ message: string; pick: TarotPick }>('/api/tarot/pick', data);
  },

  /**
   * Get user's tarot pick history
   */
  getHistory: async (limit?: number): Promise<TarotPick[]> => {
    return apiClient.get<TarotPick[]>('/api/tarot/history', limit ? { limit } : undefined);
  },
};
