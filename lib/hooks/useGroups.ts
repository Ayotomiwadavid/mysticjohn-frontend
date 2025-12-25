'use client';

import { useState, useCallback } from 'react';
import { groupsApi } from '@/lib/api';
import type {
  Group,
  Post,
  Comment,
  CreatePostRequest,
  CreateCommentRequest,
} from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseGroupsReturn {
  groups: Group[];
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchGroups: () => Promise<void>;
  fetchGroup: (id: string) => Promise<Group | null>;
  joinGroup: (id: string) => Promise<void>;
  leaveGroup: (id: string) => Promise<void>;
  fetchGroupPosts: (groupId: string) => Promise<void>;
  createPost: (groupId: string, data: CreatePostRequest) => Promise<Post | null>;
  fetchPost: (postId: string) => Promise<Post | null>;
  deletePost: (postId: string) => Promise<void>;
  createComment: (postId: string, data: CreateCommentRequest) => Promise<Comment | null>;
  deleteComment: (commentId: string) => Promise<void>;
  addReaction: (targetType: 'POST' | 'COMMENT', targetId: string, type?: string) => Promise<void>;
  removeReaction: (targetType: 'POST' | 'COMMENT', targetId: string) => Promise<void>;
  clearError: () => void;
  clearPosts: () => void;
}

/**
 * Groups hook
 * Manages group-related operations and state
 */
export function useGroups(): UseGroupsReturn {
  const [groups, setGroups] = useState<Group[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await groupsApi.getGroups();
      setGroups(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch groups.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchGroup = useCallback(async (id: string): Promise<Group | null> => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await groupsApi.getGroup(id);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch group.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const joinGroup = useCallback(async (id: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await groupsApi.joinGroup(id);
      // Refresh groups to update membership status
      await fetchGroups();
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to join group.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchGroups]);

  const leaveGroup = useCallback(async (id: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await groupsApi.leaveGroup(id);
      // Refresh groups to update membership status
      await fetchGroups();
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to leave group.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchGroups]);

  const fetchGroupPosts = useCallback(async (groupId: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await groupsApi.getGroupPosts(groupId);
      setPosts(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch posts.';
      setError(errorMessage);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPost = useCallback(
    async (groupId: string, data: CreatePostRequest): Promise<Post | null> => {
      try {
        setError(null);
        setIsLoading(true);
        const post = await groupsApi.createPost(groupId, data);
        setPosts((prev) => [post, ...prev]);
        return post;
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to create post.';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchPost = useCallback(async (postId: string): Promise<Post | null> => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await groupsApi.getPost(postId);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch post.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await groupsApi.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to delete post.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createComment = useCallback(
    async (postId: string, data: CreateCommentRequest): Promise<Comment | null> => {
      try {
        setError(null);
        setIsLoading(true);
        const comment = await groupsApi.createComment(postId, data);
        // Refresh posts to get updated comments
        const updatedPost = await groupsApi.getPost(postId);
        if (updatedPost) {
          setPosts((prev) =>
            prev.map((p) => (p.id === postId ? updatedPost : p))
          );
        }
        return comment;
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to create comment.';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteComment = useCallback(async (commentId: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await groupsApi.deleteComment(commentId);
      // Note: You may need to refresh the specific post to update comments
      // This is a simplified version
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to delete comment.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addReaction = useCallback(
    async (targetType: 'POST' | 'COMMENT', targetId: string, type?: string) => {
      try {
        setError(null);
        setIsLoading(true);
        await groupsApi.addReaction(targetType, targetId, type);
        // Refresh posts to get updated reactions
        // This could be optimized to only update the specific post/comment
        if (targetType === 'POST') {
          const updatedPost = await groupsApi.getPost(targetId);
          if (updatedPost) {
            setPosts((prev) =>
              prev.map((p) => (p.id === targetId ? updatedPost : p))
            );
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to add reaction.';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const removeReaction = useCallback(
    async (targetType: 'POST' | 'COMMENT', targetId: string) => {
      try {
        setError(null);
        setIsLoading(true);
        await groupsApi.removeReaction(targetType, targetId);
        // Refresh posts to get updated reactions
        if (targetType === 'POST') {
          const updatedPost = await groupsApi.getPost(targetId);
          if (updatedPost) {
            setPosts((prev) =>
              prev.map((p) => (p.id === targetId ? updatedPost : p))
            );
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to remove reaction.';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearPosts = useCallback(() => {
    setPosts([]);
  }, []);

  return {
    groups,
    posts,
    isLoading,
    error,
    fetchGroups,
    fetchGroup,
    joinGroup,
    leaveGroup,
    fetchGroupPosts,
    createPost,
    fetchPost,
    deletePost,
    createComment,
    deleteComment,
    addReaction,
    removeReaction,
    clearError,
    clearPosts,
  };
}

