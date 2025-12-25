'use client';

import { useState, useCallback } from 'react';
import { coursesApi } from '@/lib/api';
import type { Course, CourseEnrollment, UpdateProgressRequest } from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';

interface UseCoursesReturn {
  courses: Course[];
  enrollments: CourseEnrollment[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourse: (id: string) => Promise<Course | null>;
  fetchEnrollments: () => Promise<void>;
  updateProgress: (data: UpdateProgressRequest) => Promise<void>;
  clearError: () => void;
}

/**
 * Courses hook
 * Manages course-related operations and state
 */
export function useCourses(): UseCoursesReturn {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await coursesApi.getCourses();
      setCourses(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch courses.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCourse = useCallback(async (id: string): Promise<Course | null> => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await coursesApi.getCourse(id);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch course.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchEnrollments = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await coursesApi.getMyEnrollments();
      setEnrollments(data);
    } catch (err) {
      const errorMessage =
        err instanceof ApiClientError
          ? err.message
          : 'Failed to fetch enrollments.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProgress = useCallback(
    async (data: UpdateProgressRequest) => {
      try {
        setError(null);
        setIsLoading(true);
        await coursesApi.updateProgress(data);
        // Refresh enrollments to get updated progress
        await fetchEnrollments();
      } catch (err) {
        const errorMessage =
          err instanceof ApiClientError
            ? err.message
            : 'Failed to update progress.';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchEnrollments]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    courses,
    enrollments,
    isLoading,
    error,
    fetchCourses,
    fetchCourse,
    fetchEnrollments,
    updateProgress,
    clearError,
  };
}

