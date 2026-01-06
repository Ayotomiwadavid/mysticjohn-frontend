import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MysticalSparkles } from '@/components/mystical-sparkles'
import { Star } from 'lucide-react'
import Link from 'next/link'

interface Event {
  name: string
  date: string
  price: string
  time: string
}

export function UpcomingEvents() {
  const events: Event[] = [
    { name: 'Tarot Reading Workshop', date: 'March 15, 2025', price: '£45', time: '7:00 PM' },
    { name: 'Full Moon Meditation', date: 'March 22, 2025', price: 'Free', time: '8:00 PM' },
    { name: 'Psychic Development Circle', date: 'March 29, 2025', price: '£35', time: '6:30 PM' },
  ]

  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-lg">
            Grab yer ticket before the spirits beat ye to it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {events.map((event, i) => (
            <Card key={i} className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
              <CardHeader>
                <div className="h-40 bg-linear-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <MysticalSparkles />
                  <Star className="h-16 w-16 text-accent/40 animate-float" />
                </div>
                <CardTitle className="text-foreground">{event.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {event.date} • {event.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{event.price}</span>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Get Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="border-primary/50 hover:bg-primary/10" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

