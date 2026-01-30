'use client';

import { useState, useCallback } from 'react';
import { coursesApi } from '@/lib/api';
import type {
    Course,
    CreateCourseRequest,
    UpdateCourseRequest,
    CreateStepRequest,
    UpdateStepRequest,
} from '@/lib/api/types';
import { ApiClientError } from '@/lib/api/client';
import { toast } from 'sonner';

interface UseAdminCoursesReturn {
    courses: Course[];
    isLoading: boolean;
    error: string | null;
    fetchAllCourses: () => Promise<void>;
    createCourse: (data: CreateCourseRequest) => Promise<boolean>;
    updateCourse: (id: string, data: UpdateCourseRequest) => Promise<boolean>;
    deleteCourse: (id: string) => Promise<boolean>;
    addStep: (courseId: string, data: CreateStepRequest) => Promise<boolean>;
    updateStep: (
        courseId: string,
        stepId: string,
        data: UpdateStepRequest
    ) => Promise<boolean>;
    deleteStep: (courseId: string, stepId: string) => Promise<boolean>;
}

export function useAdminCourses(): UseAdminCoursesReturn {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllCourses = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await coursesApi.getCourses();
            const coursesData = Array.isArray(data) ? data : (data as any).data || [];
            setCourses(Array.isArray(coursesData) ? coursesData : []);
        } catch (err) {
            const message =
                err instanceof ApiClientError ? err.message : 'Failed to fetch courses';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createCourse = useCallback(
        async (data: CreateCourseRequest): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await coursesApi.createCourse(data);
                await fetchAllCourses();
                toast.success('Course created successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to create course';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchAllCourses]
    );

    const updateCourse = useCallback(
        async (id: string, data: UpdateCourseRequest): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await coursesApi.updateCourse(id, data);
                await fetchAllCourses();
                toast.success('Course updated successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to update course';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchAllCourses]
    );

    const deleteCourse = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await coursesApi.deleteCourse(id);
                setCourses((prev) => prev.filter((c) => c.id !== id));
                toast.success('Course deleted successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to delete course';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const addStep = useCallback(
        async (courseId: string, data: CreateStepRequest): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await coursesApi.addStep(courseId, data);
                await fetchAllCourses();
                toast.success('Step added successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError ? err.message : 'Failed to add step';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchAllCourses]
    );

    const updateStep = useCallback(
        async (
            courseId: string,
            stepId: string,
            data: UpdateStepRequest
        ): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await coursesApi.updateStep(courseId, stepId, data);
                await fetchAllCourses();
                toast.success('Step updated successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to update step';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchAllCourses]
    );

    const deleteStep = useCallback(
        async (courseId: string, stepId: string): Promise<boolean> => {
            try {
                setIsLoading(true);
                setError(null);
                await coursesApi.deleteStep(courseId, stepId);
                await fetchAllCourses();
                toast.success('Step deleted successfully');
                return true;
            } catch (err) {
                const message =
                    err instanceof ApiClientError
                        ? err.message
                        : 'Failed to delete step';
                setError(message);
                toast.error(message);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [fetchAllCourses]
    );

    return {
        courses,
        isLoading,
        error,
        fetchAllCourses,
        createCourse,
        updateCourse,
        deleteCourse,
        addStep,
        updateStep,
        deleteStep,
    };
}
