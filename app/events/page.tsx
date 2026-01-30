'use client';

import { useEffect } from 'react';
import { LandingNavigation } from '@/components/landing-navigation';
import { Footer } from '@/components/footer';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Video, Clock, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useEvents } from '@/lib/hooks/useEvents';
import { format, parseISO } from 'date-fns';

export default function EventsPage() {
    const { events, isLoading, error, fetchEvents } = useEvents();

    useEffect(() => {
        fetchEvents(true); // Fetch upcoming events
    }, [fetchEvents]);

    const formatDate = (dateString: string) => {
        try {
            return format(parseISO(dateString), 'EEEE, MMMM d, yyyy');
        } catch {
            return dateString;
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return format(parseISO(dateString), 'h:mm a');
        } catch {
            return '';
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <LandingNavigation />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative py-24 overflow-hidden">
                    <MysticalSparkles />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                            Live Events
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Join John Spratt for an evening of spirit communication, healing, and connection.
                        </p>
                    </div>
                </section>

                {/* Events Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <p className="text-destructive mb-4">{error}</p>
                                <Button onClick={() => fetchEvents(true)}>Try Again</Button>
                            </div>
                        ) : events.length === 0 ? (
                            <div className="text-center py-20 bg-card/50 rounded-2xl border border-border/50">
                                <Calendar className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">No Upcoming Events</h3>
                                <p className="text-muted-foreground">
                                    Check back soon for new dates, or sign up for our newsletter to be notified.
                                </p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {events.map((event) => (
                                    <Card key={event.id} className="group border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden flex flex-col">
                                        <div className="aspect-video bg-muted/50 relative overflow-hidden">
                                            {event.coverImageUrl ? (
                                                <img
                                                    src={event.coverImageUrl}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
                                                    <Ticket className="h-12 w-12 text-primary/30" />
                                                </div>
                                            )}

                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold border border-white/10 shadow-lg">
                                                {format(parseISO(event.startDateTime), 'MMM d')}
                                            </div>
                                        </div>

                                        <CardHeader>
                                            <div className="flex justify-between items-start gap-4">
                                                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                                                    {event.title}
                                                </CardTitle>
                                            </div>
                                            <CardDescription className="flex items-center gap-2 mt-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{formatTime(event.startDateTime)}</span>
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-3 grow">
                                            {event.isOnline ? (
                                                <div className="flex items-center gap-2 text-sm text-foreground/80">
                                                    <Video className="h-4 w-4 text-primary" />
                                                    <span>Online Event</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-sm text-foreground/80">
                                                    <MapPin className="h-4 w-4 text-accent" />
                                                    <span>{event.location || 'Location TBA'}</span>
                                                </div>
                                            )}
                                            <p className="text-muted-foreground text-sm line-clamp-3">
                                                {event.description}
                                            </p>
                                        </CardContent>

                                        <CardFooter className="pt-4 border-t border-border/50 flex justify-between items-center">
                                            <div className="text-lg font-bold text-primary">
                                                £{event.price}
                                            </div>
                                            <Button asChild>
                                                <Link href={`/events/${event.id}`}>
                                                    Event Details
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
