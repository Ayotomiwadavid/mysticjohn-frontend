'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { authApi } from '@/lib/api';
import { Sparkles, Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  getDailyHoroscope,
  ZODIAC_SIGNS,
  ZODIAC_DATES,
  type ZodiacSign,
  type HoroscopeData,
} from '@/lib/data/horoscopes';

export default function HoroscopesPage() {
  const { user } = useAuthContext();
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize with user's saved zodiac sign or first sign
  useEffect(() => {
    if (user) {
      const defaultSign = user.zodiacSign || ZODIAC_SIGNS[0];
      setSelectedSign(defaultSign as ZodiacSign);
    }
  }, [user]);

  // Fetch horoscope when sign is selected
  useEffect(() => {
    if (selectedSign) {
      const data = getDailyHoroscope(selectedSign);
      setHoroscope(data);
    }
  }, [selectedSign]);

  const handleSignChange = async (sign: ZodiacSign) => {
    setSelectedSign(sign);
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const data = getDailyHoroscope(sign);
      setHoroscope(data);
      setIsLoading(false);
    }, 300);

    // Save to profile (optional)
    try {
      setIsSaving(true);
      await authApi.updateProfile({ zodiacSign: sign });
      toast.success('Zodiac sign saved to your profile');
    } catch (error) {
      // Silently fail - not critical
      console.error('Failed to save zodiac sign:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="flex">
          <DashboardSidebar />

          <main className="flex-1 p-6 lg:p-8 lg:ml-64 pb-20 lg:pb-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Daily Horoscopes
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Discover what the stars have in store for ye today
                  </p>
                </div>
              </div>
            </div>

            {/* Zodiac Sign Selector */}
            <Card className="mb-6 border-border/50">
              <CardHeader>
                <CardTitle>Select Your Zodiac Sign</CardTitle>
                <CardDescription>
                  Choose yer sign to see today's reading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {ZODIAC_SIGNS.map((sign) => (
                    <Button
                      key={sign}
                      variant={selectedSign === sign ? 'default' : 'outline'}
                      onClick={() => handleSignChange(sign)}
                      disabled={isLoading || isSaving}
                      className={`h-auto py-4 flex flex-col items-center gap-2 ${
                        selectedSign === sign
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:border-primary/50'
                      }`}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          selectedSign === sign ? 'text-primary-foreground' : 'text-primary'
                        }`}
                      />
                      <span className="text-sm font-medium">{sign}</span>
                      <span className="text-xs opacity-75">
                        {ZODIAC_DATES[sign].start} - {ZODIAC_DATES[sign].end}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Horoscope Reading */}
            {isLoading ? (
              <Card className="border-border/50">
                <CardContent className="py-12 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Reading the stars...</p>
                </CardContent>
              </Card>
            ) : horoscope ? (
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {horoscope.sign} - {format(new Date(horoscope.date), 'EEEE, MMMM d, yyyy')}
                      </CardTitle>
                      <CardDescription>
                        Daily horoscope reading for {horoscope.sign}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Reading */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <p className="text-lg leading-relaxed text-foreground whitespace-pre-line">
                      {horoscope.reading}
                    </p>
                  </div>

                  {/* Lucky Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {horoscope.luckyNumber && (
                      <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Lucky Number</p>
                        <p className="text-3xl font-bold text-primary">{horoscope.luckyNumber}</p>
                      </div>
                    )}
                    {horoscope.luckyColor && (
                      <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Lucky Color</p>
                        <p className="text-2xl font-bold text-primary">{horoscope.luckyColor}</p>
                      </div>
                    )}
                    {horoscope.mood && (
                      <div className="bg-card border border-border/50 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Mood</p>
                        <p className="text-2xl font-bold text-primary">{horoscope.mood}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </main>
        </div>
        <MobileBottomNav />
      </div>
    </ProtectedRoute>
  );
}
