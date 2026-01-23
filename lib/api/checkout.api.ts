import { apiClient } from './client';
import type { CheckoutRequest, CheckoutResponse, CheckoutConfirmResponse } from './types';

/**
 * Checkout API
 */
export const checkoutApi = {
  /**
   * Unified checkout for tickets, courses, or credit packs
   */
  checkout: async (data: CheckoutRequest): Promise<CheckoutResponse> => {
    return apiClient.post<CheckoutResponse>('/api/checkout', data);
  },

  /**
   * Confirm a checkout session after redirect back from Stripe
   */
  confirm: async (params: {
    transactionId: string;
    sessionId?: string | null;
  }): Promise<CheckoutConfirmResponse> => {
    // Backend expects transactionId and optional sessionId as query parameters
    const queryParams: Record<string, any> = {
      transactionId: params.transactionId,
    };
    
    if (params.sessionId) {
      queryParams.sessionId = params.sessionId;
    }
    
    return apiClient.get<CheckoutConfirmResponse>('/api/checkout/confirm', queryParams);
  },
};


// ('/api/checkout/confirm', queryParams)