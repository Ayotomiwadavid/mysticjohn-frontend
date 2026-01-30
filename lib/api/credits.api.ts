import { apiClient } from './client';
import type {
  CreditPack,
  CreditBalance,
  CreditTransaction,
} from './types';

/**
 * Credits API
 */
export const creditsApi = {
  /**
   * Get all active credit packs
   */
  getAllCreditPacks: async (): Promise<CreditPack[]> => {
    const response = await apiClient.get<any>('/api/credit-packs');
    if (Array.isArray(response)) {
      return response;
    }
    const data = response.data || response.creditPacks;
    return Array.isArray(data) ? data : [];
  },

  /**
   * Get credit transaction history
   */
  getCreditTransactions: async (): Promise<CreditTransaction[]> => {
    const response = await apiClient.get<any>('/api/credits/transactions');
    return response.data || response;
  },
};

