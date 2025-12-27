'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGroups, useChat } from '@/lib/hooks';
import { useAuthContext } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Send, Loader2, ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  const { user } = useAuthContext();
  const { fetchGroup, joinGroup, leaveGroup, isLoading: groupLoading } = useGroups();
  const {
    messages,
    isLoading: chatLoading,
    error: chatError,
    isConnected,
    fetchMessages,
    sendMessage,
    markAsRead,
    clearMessages,
  } = useChat();

  const [group, setGroup] = useState<any>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Fetch group details
  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId).then((groupData) => {
        if (groupData) {
          setGroup(groupData);
          if (groupData.isMember) {
            // Load messages if user is a member
            fetchMessages(groupId);
            markAsRead(groupId);
          }
        }
      });
    }

    return () => {
      clearMessages();
    };
  }, [groupId, fetchGroup, fetchMessages, markAsRead, clearMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleJoin = async () => {
    try {
      await joinGroup(groupId);
      const updatedGroup = await fetchGroup(groupId);
      if (updatedGroup) {
        setGroup(updatedGroup);
        fetchMessages(groupId);
        markAsRead(groupId);
      }
      toast.success('Joined group successfully!');
    } catch (err) {
      toast.error('Failed to join group');
    }
  };

  const handleLeave = async () => {
    try {
      await leaveGroup(groupId);
      const updatedGroup = await fetchGroup(groupId);
      if (updatedGroup) {
        setGroup(updatedGroup);
        clearMessages();
      }
      toast.success('Left group successfully!');
    } catch (err) {
      toast.error('Failed to leave group');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(groupId, {
        message: messageInput.trim(),
        type: 'TEXT',
      });
      setMessageInput('');
      // Mark as read after sending
      markAsRead(groupId);
    } catch (err) {
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  if (groupLoading || !group) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link href="/groups">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              {group.name}
            </h1>
            <p className="text-muted-foreground mt-1">{group.description || 'No description'}</p>
          </div>
          {group.isMember ? (
            <Button variant="destructive" onClick={handleLeave}>
              Leave Group
            </Button>
          ) : (
            <Button onClick={handleJoin} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Group
            </Button>
          )}
        </div>

        {chatError && (
          <div className="mb-4 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive">
            {chatError}
          </div>
        )}

        {!group.isMember ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">You must join this group to view and send messages.</p>
              <Button onClick={handleJoin} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Join Group
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chat Section */}
            <div className="lg:col-span-2">
              <Card className="h-[calc(100vh-200px)] flex flex-col">
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Chat
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div
                        className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
                      />
                      <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages Area */}
                  <div className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
                    {chatLoading && messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No messages yet. Start the conversation!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => {
                          const isOwnMessage = message.userId === user?.id;
                          return (
                            <div
                              key={message.id}
                              className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {message.user?.name?.charAt(0).toUpperCase() || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`flex-1 ${isOwnMessage ? 'text-right' : ''}`}>
                                <div
                                  className={`inline-block max-w-[70%] rounded-lg px-4 py-2 ${
                                    isOwnMessage
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted text-foreground'
                                  }`}
                                >
                                  <p className="text-sm font-medium mb-1 opacity-80">
                                    {isOwnMessage ? 'You' : message.user?.name || 'Unknown'}
                                  </p>
                                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                                  <p className="text-xs opacity-70 mt-1">
                                    {format(new Date(message.createdAt), 'HH:mm')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="border-t border-border/50 p-4">
                    <div className="flex gap-2">
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isSending || !isConnected}
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                      <Button
                        type="submit"
                        disabled={!messageInput.trim() || isSending || !isConnected}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {isSending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Group Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Group Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Privacy</p>
                    <p className="font-medium">{group.privacy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Members</p>
                    <p className="font-medium">{group.memberCount || 0} members</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

