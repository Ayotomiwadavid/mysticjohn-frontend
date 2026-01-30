'use client';

import { useState, useEffect } from 'react';
import { ProtectedAdminRoute } from '@/components/ProtectedAdminRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { communityApi } from '@/lib/api';
import { Loader2, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function AdminCommunityPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // We reuse getFeed but maybe without filters to see latest posts
    const loadPosts = async () => {
        setIsLoading(true);
        try {
            const response = await communityApi.getFeed(1, 50); // Fetch more for admin
            const feedPosts = Array.isArray(response) ? response : (response as any).data?.posts || (response as any).posts || [];
            setPosts(feedPosts);
        } catch (err) {
            toast.error('Failed to load posts');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleModerate = async (id: string, action: 'delete' | 'hide') => {
        if (!confirm(`Are you sure you want to ${action} this post?`)) return;

        try {
            await communityApi.moderatePost(id, action);
            toast.success(`Post ${action}d`);
            setPosts(posts.filter(p => p.id !== id));
        } catch (err) {
            toast.error(`Failed to ${action} post`);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Community Moderation</h1>
                <p className="text-muted-foreground">Manage user posts and content</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>Review and moderate community activity</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead className="w-[50%]">Content</TableHead>
                                    <TableHead>Posted</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="font-medium">
                                            {post.user?.name || 'Unknown User'}
                                            <div className="text-xs text-muted-foreground">{post.user?.email}</div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="line-clamp-2">{post.content}</p>
                                            {post.mediaUrl && <span className="text-xs text-primary">[Media Attached]</span>}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleModerate(post.id, 'delete')}
                                                className="text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {posts.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                            No posts to moderate.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
