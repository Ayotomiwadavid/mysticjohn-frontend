'use client';

import { Footer } from '@/components/footer';
import { MysticalSparkles } from '@/components/mystical-sparkles';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Sparkles, Heart, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <MysticalSparkles />
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent z-0" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                About John Spratt
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Psychic Medium, Healer, and Spiritual Guide
              </p>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Photo placeholder until we have a real one */}
              <div className="relative aspect-[3/4] bg-accent/10 rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                  <span className="text-lg">John Spratt Photo</span>
                </div>
                {/* <Image 
                  src="/john-photo.jpg" 
                  alt="John Spratt" 
                  fill 
                  className="object-cover"
                /> */}
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-primary/80 mb-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="font-semibold tracking-wider uppercase text-sm">The Journey</span>
                  </div>
                  <p className="text-foreground/90 italic">
                    "I believe everyone has the power to connect with the universe. I'm just here to help turn on the light."
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground text-xl block mb-2">Hello, lovely soul.</strong>
                  I'm John Spratt, a psychic medium based in Scotland. My journey with the spirit world began when I was just a wee lad, though it took me years to fully embrace and understand the gifts I was given.
                </p>
                <p>
                  For over 15 years, I've been helping people connect with their loved ones in spirit, find clarity in their lives, and heal from past traumas. My approach is down-to-earth, honest, and always delivered with love (and a bit of Scottish banter!).
                </p>
                <p>
                  I don't believe in doom and gloom. Spirit communication should be healing, uplifting, and empowering. Whether you're looking for closure, guidance on your path, or just a little reassurance that you're not alone, I'm honored to walk this part of your journey with you.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Card className="bg-card/50 border-primary/20">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Heart className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-bold text-foreground">Compassionate</div>
                        <div className="text-xs">Heart-led readings</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 border-accent/20">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Zap className="h-8 w-8 text-accent" />
                      <div>
                        <div className="font-bold text-foreground">Authentic</div>
                        <div className="text-xs">No-nonsense guidance</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy/Stats Section */}
        <section className="py-20 bg-linear-to-b from-background to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-12">My Approach</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="space-y-4 p-6 rounded-2xl bg-card/30 border border-white/5 hover:bg-card/50 transition-colors">
                <div className="h-12 w-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Clarity</h3>
                <p className="text-muted-foreground">
                  Cutting through the noise to give you clear, actionable guidance for your life's path.
                </p>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-card/30 border border-white/5 hover:bg-card/50 transition-colors">
                <div className="h-12 w-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Healing</h3>
                <p className="text-muted-foreground">
                  Connecting with spirit to bring peace, closure, and emotional healing to your heart.
                </p>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-card/30 border border-white/5 hover:bg-card/50 transition-colors">
                <div className="h-12 w-12 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Empowerment</h3>
                <p className="text-muted-foreground">
                  Helping you trust your own intuition and make decisions that align with your highest good.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
