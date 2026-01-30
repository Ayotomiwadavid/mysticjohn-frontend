'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Add imports
import { LogOut, Shield, Menu } from 'lucide-react'; // Add Menu icon
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, isLoading, logout } = useAuthContext();
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            router.push('/admin/login');
        }
    }, [user, isLoading, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>;
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Desktop Sidebar */}
            <AdminSidebar />

            <div className="lg:ml-64 min-h-screen flex flex-col transition-all duration-300">
                {/* Admin Header */}
                <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger */}
                        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-muted">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-72 bg-card/95 backdrop-blur-xl border-r-border/50">
                                <AdminSidebar className="block lg:hidden w-full relative h-full border-none bg-transparent" onLinkClick={() => setIsMobileOpen(false)} />
                            </SheetContent>
                        </Sheet>

                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Shield className="h-4 w-4" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-semibold leading-none">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                        <LogOut className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </header>

                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
