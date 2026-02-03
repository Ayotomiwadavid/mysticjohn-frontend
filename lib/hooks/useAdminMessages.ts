'use client';

import { useState, useCallback } from 'react';
import { messagesApi } from '@/lib/api';
import type { QuickQuestion, ReplyToQuestionRequest } from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';
import { toast } from 'sonner';

interface UseAdminMessagesReturn {
    questions: QuickQuestion[];
    isLoading: boolean;
    error: string | null;
    fetchQuestions: () => Promise<void>;
    replyToQuestion: (id: string, data: ReplyToQuestionRequest) => Promise<boolean>;
}

export function useAdminMessages(): UseAdminMessagesReturn {
    const [questions, setQuestions] = useState<QuickQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQuestions = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await messagesApi.getAllQuestions();
            setQuestions(data);
        } catch (err) {
            const message =
                err instanceof ApiClientError ? err.message : 'Failed to fetch messages';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const replyToQuestion = useCallback(
        async (id: string, data: ReplyToQuestionRequest): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await messagesApi.replyToQuestion(id, data);
                await fetchQuestions();
                toast.success('Reply sent successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to send reply';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchQuestions]
    );

    return {
        questions,
        isLoading,
        error,
        fetchQuestions,
        replyToQuestion,
    };
}
