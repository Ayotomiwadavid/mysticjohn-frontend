'use client';

import { useEffect, useState } from 'react';
import { useGroups } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Loader2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function GroupsPage() {
  const { groups, isLoading, error, fetchGroups, joinGroup, leaveGroup } = useGroups();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleJoin = async (groupId: string) => {
    try {
      await joinGroup(groupId);
      toast.success('Joined group successfully!');
    } catch (err) {
      toast.error('Failed to join group');
    }
  };

  const handleLeave = async (groupId: string) => {
    try {
      await leaveGroup(groupId);
      toast.success('Left group successfully!');
    } catch (err) {
      toast.error('Failed to leave group');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Groups</h1>
          <p className="text-muted-foreground">Join communities and connect with others</p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive">
            {error}
          </div>
        )}

        {groups.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No groups available at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="border-primary/20 hover:border-primary/40 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {group.name}
                  </CardTitle>
                  <CardDescription>{group.description || 'No description'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{group.memberCount || 0} members</span>
                    <span className="px-2 py-1 rounded-full bg-muted text-xs">
                      {group.privacy}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/groups/${group.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    {group.isMember ? (
                      <Button
                        variant="destructive"
                        onClick={() => handleLeave(group.id)}
                        className="flex-1"
                      >
                        Leave
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleJoin(group.id)}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Join
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

