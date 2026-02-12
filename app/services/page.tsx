'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, MapPin, Users, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative py-24 overflow-hidden">
                    <MysticalSparkles />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                            Services & Offerings
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            From private readings to live events, explore the ways we can connect with spirit together.
                        </p>
                    </div>
                </section>

                {/* Private Readings */}
                <section className="py-16 bg-card/30">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-10 w-1 rounded-full bg-primary" />
                            <h2 className="text-3xl font-bold text-foreground">Private Readings</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Service 1 */}
                            <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Video className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Online Psychic Reading</CardTitle>
                                    <CardDescription>Via Google Meet • 30 or 45 mins</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Connect from anywhere in the world. A deep dive into your current path, future possibilities, and spiritual guidance.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-primary" /> flexible scheduling</li>
                                        <li className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-primary" /> video recording included</li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" asChild>
                                        <Link href="/bookings">Book Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Service 2 */}
                            <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                        <MapPin className="h-6 w-6 text-accent" />
                                    </div>
                                    <CardTitle>In-Person Reading</CardTitle>
                                    <CardDescription>Glasgow Studio • 45 mins</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Sit down with me face-to-face in my private studio space. A personal and intimate session to connect with spirit.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-accent" /> private comfortable setting</li>
                                        <li className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-accent" /> oracle cards included</li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                                        <Link href="/bookings">Book Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Service 3 */}
                            <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                                        <Users className="h-6 w-6 text-secondary-foreground" />
                                    </div>
                                    <CardTitle>Group Reading</CardTitle>
                                    <CardDescription>In-Person or Online • 90 mins</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        Gather your friends or family for a shared spiritual experience. Everyone gets a mini-reading within the group.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-secondary-foreground" /> up to 6 people</li>
                                        <li className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-secondary-foreground" /> shared connection</li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href="/contact">Enquire Direct</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Live Events */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-1 rounded-full bg-accent" />
                                <h2 className="text-3xl font-bold text-foreground">Live Events</h2>
                            </div>
                            <Button variant="ghost" asChild className="hidden md:flex">
                                <Link href="/events" className="flex items-center gap-2">
                                    View Full Calendar <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="bg-linear-to-r from-primary/10 via-accent/5 to-transparent rounded-2xl p-8 md:p-12 relative overflow-hidden border border-primary/20">
                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-6">
                                    <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">Featured Experience</Badge>
                                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                                        An Evening of Mediumship
                                    </h3>
                                    <p className="text-lg text-muted-foreground">
                                        Join me for electric evenings of spirit communication in venues across the UK. Witness the impossible become possible as we bridge the gap between two worlds.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                            <Link href="/events">Find an Event Near You</Link>
                                        </Button>
                                        <Button size="lg" variant="outline" asChild>
                                            <Link href="/events">View Online Shows</Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    {/* Decorative element or image placeholder */}
                                    <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                                        <Calendar className="h-16 w-16 text-white/20" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center md:hidden">
                            <Button variant="ghost" asChild>
                                <Link href="/events" className="flex items-center gap-2">
                                    View Full Calendar <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
