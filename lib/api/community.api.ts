import { apiClient } from './client';
import { ApiResponse, Post, Comment, CreatePostRequest, CreateCommentRequest, FeedResponse } from './types';

class CommunityApi {
    /**
     * Get community feed
     */
    async getFeed(page: number = 1, limit: number = 20): Promise<ApiResponse<FeedResponse | Post[]>> {
        // Handling different potential responses (paginated or simple array)
        return apiClient.get('/community/feed', { page, limit });
    }

    /**
     * Get posts by hashtag
     */
    async getPostsByHashtag(hashtag: string, page: number = 1, limit: number = 20): Promise<ApiResponse<FeedResponse | Post[]>> {
        return apiClient.get(`/community/hashtag/${hashtag}`, { page, limit });
    }

    /**
     * Create post
     */
    async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
        return apiClient.post('/community/posts', data);
    }

    /**
     * Delete post
     */
    async deletePost(postId: string): Promise<ApiResponse<void>> {
        return apiClient.delete(`/community/posts/${postId}`);
    }

    /**
     * Like post
     */
    async likePost(postId: string): Promise<ApiResponse<void>> {
        return apiClient.post(`/community/posts/${postId}/like`);
    }

    /**
     * Add comment
     */
    async addComment(postId: string, data: CreateCommentRequest): Promise<ApiResponse<Comment>> {
        return apiClient.post(`/community/posts/${postId}/comment`, data);
    }

    /**
     * Moderate post (Admin)
     */
    async moderatePost(postId: string, action: 'hide' | 'delete'): Promise<ApiResponse<void>> {
        return apiClient.post(`/community/posts/${postId}/moderate`, { action });
    }
}

export const communityApi = new CommunityApi();
