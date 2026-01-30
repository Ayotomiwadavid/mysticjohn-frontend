'use client';

import { useEffect, useState } from 'react';
import { useAdminCourses } from '@/lib/hooks/useAdminCourses';
import { Course, CreateCourseRequest } from '@/lib/api/types';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    Loader2,
    Plus,
    Edit,
    Trash2,
    BookOpen,
    MoreVertical,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminCoursesPage() {
    const {
        courses,
        isLoading,
        fetchAllCourses,
        createCourse,
        updateCourse,
        deleteCourse,
    } = useAdminCourses();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState<CreateCourseRequest>({
        title: '',
        description: '',
        price: 0,
        coverImageUrl: '',
        image: '',
        instructor: '',
        duration: 0,
        level: 'beginner',
        category: '',
        lessonCount: 0,
        isPublished: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchAllCourses();
    }, [fetchAllCourses]);

    const resetForm = () => {
        setEditingCourse(null);
        setFormData({
            title: '',
            description: '',
            price: 0,
            coverImageUrl: '',
            image: '',
            instructor: '',
            duration: 0,
            level: 'beginner',
            category: '',
            lessonCount: 0,
            isPublished: false,
        });
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description || '',
            price: course.price,
            coverImageUrl: course.coverImageUrl || '',
            image: course.image || course.coverImageUrl || '',
            instructor: course.instructor || '',
            duration: course.duration || 0,
            level: course.level || 'beginner',
            category: course.category || '',
            lessonCount: course.lessonCount || 0,
            isPublished: course.isPublished,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this course?')) {
            await deleteCourse(id);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingCourse) {
                await updateCourse(editingCourse.id, formData);
            } else {
                await createCourse(formData);
            }
            setIsDialogOpen(false);
            resetForm();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Manage Courses</h1>
                    <p className="text-muted-foreground">
                        Create and manage educational courses
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="h-4 w-4 mr-2" /> Create Course
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingCourse ? 'Edit Course' : 'Create New Course'}
                            </DialogTitle>
                            <DialogDescription>
                                Fill in the details for the course.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Course Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price (£)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                price: parseFloat(e.target.value),
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Duration (mins)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        min="0"
                                        value={formData.duration}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                duration: parseFloat(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="instructor">Instructor</Label>
                                    <Input
                                        id="instructor"
                                        value={formData.instructor}
                                        onChange={(e) =>
                                            setFormData({ ...formData, instructor: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({ ...formData, category: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            {/* Image URL logic: Update both image and coverImageUrl for compatibility */}
                            <div className="grid gap-2">
                                <Label htmlFor="image">Cover Image URL</Label>
                                <Input
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            image: e.target.value,
                                            coverImageUrl: e.target.value
                                        })
                                    }
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="level">Level</Label>
                                    <select
                                        id="level"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.level}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                level: e.target.value as any,
                                            })
                                        }
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lessonCount">Lesson Count</Label>
                                    <Input
                                        id="lessonCount"
                                        type="number"
                                        min="0"
                                        value={formData.lessonCount}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                lessonCount: parseInt(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                                <Switch
                                    id="isPublished"
                                    checked={formData.isPublished}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, isPublished: checked })
                                    }
                                />
                                <Label htmlFor="isPublished">
                                    Publish Course (Visible to users)
                                </Label>
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    )}
                                    {editingCourse ? 'Update Course' : 'Create Course'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent >
                </Dialog >
            </div >

            <Card>
                <CardHeader>
                    <CardTitle>All Courses</CardTitle>
                    <CardDescription>
                        Manage your course catalog and content
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && courses.length === 0 ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Steps</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div>{course.title}</div>
                                                    <div className="text-xs text-muted-foreground">{course.instructor} • {course.category}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>£{course.price}</TableCell>
                                        <TableCell>
                                            {course.isPublished ? (
                                                <Badge variant="default" className="bg-green-600">
                                                    Published
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">Draft</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {course.steps?.length || 0} Steps
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleEdit(course)}>
                                                        <Edit className="h-4 w-4 mr-2" /> Edit Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <BookOpen className="h-4 w-4 mr-2" /> Manage Content
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={() => handleDelete(course.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" /> Delete Course
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {courses.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            No courses found. Create one to get started.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div >
    );
}
