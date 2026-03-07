'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Loader2, AlertTriangle, Clock } from 'lucide-react';
import { bookingsApi } from '@/lib/api';
import type { Service, AvailabilitySlot } from '@/lib/api/types';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function BookServicePage() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [availability, setAvailability] = useState<AvailabilitySlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchService = useCallback(async () => {
    if (typeof id !== 'string') return;
    try {
      const fetchedService = await bookingsApi.getService(id);
      setService(fetchedService);
    } catch (err) {
      setError('Failed to load service information. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const fetchAvailability = useCallback(async (date: Date) => {
    if (typeof id !== 'string' || !service) return;
    setIsAvailabilityLoading(true);
    try {
      const dateString = format(date, 'yyyy-MM-dd');
      const fetchedAvailability = await bookingsApi.getAvailability(id, dateString, service.duration);
      setAvailability(fetchedAvailability);
      setSelectedTime(null);
    } catch (err) {
      toast.error('Failed to load availability for this date.');
    } finally {
      setIsAvailabilityLoading(false);
    }
  }, [id, service]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  useEffect(() => {
    if (selectedDate && service) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate, service, fetchAvailability]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !service) {
      toast.error('Please select a date and time.');
      return;
    }

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const bookingDateTime = new Date(selectedDate);
    bookingDateTime.setHours(hours, minutes, 0, 0);

    try {
      await bookingsApi.createBooking({
        bookingTypeId: service.id,
        startTime: bookingDateTime.toISOString(),
        bookingType: 'online', // Defaulting to online, could be an option
      });
      toast.success(`Booking for ${service.name} at ${format(bookingDateTime, 'PPp')} has been requested!`);
      // Redirect or clear state
    } catch (err: any) {
      toast.error(err.message || 'Failed to create booking. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold text-destructive">An Error Occurred</h2>
        <p className="text-muted-foreground mt-2">{error || 'Service not found.'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{service.name}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {service.duration} mins
              </span>
              <span className="font-bold text-primary">£{service.price}</span>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">1. Select a Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border border-border/50 bg-background/50"
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6} // Example: disable weekends
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">2. Select a Time</h3>
              {isAvailabilityLoading ? (
                <div className="flex justify-center items-center h-48">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : availability?.slots && availability.slots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {availability.slots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      onClick={() => setSelectedTime(time)}
                      className="text-sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/50">
                  <Clock className="h-8 w-8 mb-2 opacity-20" />
                  <p className="text-sm">No available times for this date.</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 border-t border-border/50 pt-6">
            <div className="flex-1">
              {selectedDate && selectedTime && (
                <p className="text-sm text-muted-foreground">
                  Selected: <span className="font-semibold text-foreground">{format(selectedDate, 'PP')} at {selectedTime}</span>
                </p>
              )}
            </div>
            <Button 
              onClick={handleBooking} 
              disabled={!selectedTime || isAvailabilityLoading} 
              className="w-full sm:w-auto px-8"
            >
              Confirm Booking
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
