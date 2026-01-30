'use client';

import { useEffect, useState } from 'react';
import { useAdminBookings } from '@/lib/hooks/useAdminBookings';
import { Service, CreateServiceRequest, Booking } from '@/lib/api/types';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function AdminBookingsPage() {
    const {
        services,
        bookings,
        isLoading,
        fetchAllBookings,
        fetchServices,
        createService,
        updateService,
        deleteService,
    } = useAdminBookings();

    const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [serviceFormData, setServiceFormData] = useState<CreateServiceRequest>({
        name: '',
        description: '',
        price: 0,
        duration: 60,
        active: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchServices();
        fetchAllBookings();
    }, [fetchServices, fetchAllBookings]);

    const resetServiceForm = () => {
        setEditingService(null);
        setServiceFormData({
            name: '',
            description: '',
            price: 0,
            duration: 60,
            active: true,
        });
    };

    const handleEditService = (service: Service) => {
        setEditingService(service);
        setServiceFormData({
            name: service.name,
            description: service.description || '',
            price: service.price,
            duration: service.duration,
            active: service.active,
        });
        setIsServiceDialogOpen(true);
    };

    const handleDeleteService = async (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            await deleteService(id);
        }
    };

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingService) {
                await updateService(editingService.id, serviceFormData);
            } else {
                await createService(serviceFormData);
            }
            setIsServiceDialogOpen(false);
            resetServiceForm();
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case 'CONFIRMED':
                return <Badge className="bg-green-600">Confirmed</Badge>;
            case 'PENDING':
                return <Badge variant="secondary">Pending</Badge>;
            case 'CANCELLED':
                return <Badge variant="destructive">Cancelled</Badge>;
            case 'COMPLETED':
                return <Badge variant="outline">Completed</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Manage Bookings</h1>
                <p className="text-muted-foreground">
                    View bookings and manage available services
                </p>
            </div>

            <Tabs defaultValue="bookings" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="bookings">All Bookings</TabsTrigger>
                    <TabsTrigger value="services">Manage Services</TabsTrigger>
                </TabsList>

                <TabsContent value="bookings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking History</CardTitle>
                            <CardDescription>
                                View all user appointments and sessions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading && bookings.length === 0 ? (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Service</TableHead>
                                            <TableHead>Date & Time</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bookings.map((booking) => (
                                            <TableRow key={booking.id}>
                                                <TableCell className="font-medium">
                                                    {booking.service?.name || 'Unknown Service'}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            {format(
                                                                parseISO(booking.startDateTime),
                                                                'MMM d, yyyy'
                                                            )}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {format(parseISO(booking.startDateTime), 'h:mm a')}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {booking.type === 'ONLINE' ? (
                                                        <Badge variant="secondary">Online</Badge>
                                                    ) : (
                                                        <Badge variant="outline">In-Person</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                            </TableRow>
                                        ))}
                                        {bookings.length === 0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="text-center py-8 text-muted-foreground"
                                                >
                                                    No bookings found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="services">
                    <div className="flex justify-end mb-4">
                        <Dialog
                            open={isServiceDialogOpen}
                            onOpenChange={setIsServiceDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button onClick={resetServiceForm}>
                                    <Plus className="h-4 w-4 mr-2" /> Create Service
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingService ? 'Edit Service' : 'Create New Service'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Define a service that users can book.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleServiceSubmit} className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Service Name</Label>
                                        <Input
                                            id="name"
                                            value={serviceFormData.name}
                                            onChange={(e) =>
                                                setServiceFormData({
                                                    ...serviceFormData,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={serviceFormData.description}
                                            onChange={(e) =>
                                                setServiceFormData({
                                                    ...serviceFormData,
                                                    description: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="price">Price (£)</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={serviceFormData.price}
                                                onChange={(e) =>
                                                    setServiceFormData({
                                                        ...serviceFormData,
                                                        price: parseFloat(e.target.value),
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="duration">Duration (minutes)</Label>
                                            <Input
                                                id="duration"
                                                type="number"
                                                min="15"
                                                step="15"
                                                value={serviceFormData.duration}
                                                onChange={(e) =>
                                                    setServiceFormData({
                                                        ...serviceFormData,
                                                        duration: parseInt(e.target.value),
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <Switch
                                            id="active"
                                            checked={serviceFormData.active}
                                            onCheckedChange={(checked) =>
                                                setServiceFormData({ ...serviceFormData, active: checked })
                                            }
                                        />
                                        <Label htmlFor="active">Active (Available for booking)</Label>
                                    </div>

                                    <DialogFooter>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting && (
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            )}
                                            {editingService ? 'Update Service' : 'Create Service'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Services</CardTitle>
                            <CardDescription>
                                Manage the services you offer to clients
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading && services.length === 0 ? (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {services.map((service) => (
                                        <Card
                                            key={service.id}
                                            className="border border-border/50 hover:border-border transition-colors"
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-xl">
                                                        {service.name}
                                                    </CardTitle>
                                                    <Badge
                                                        variant={service.active ? 'default' : 'secondary'}
                                                    >
                                                        {service.active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </div>
                                                <CardDescription>{service.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {service.duration} mins
                                                    </div>
                                                    <div className="font-semibold text-foreground">
                                                        £{service.price}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1"
                                                        onClick={() => handleEditService(service)}
                                                    >
                                                        <Edit className="h-4 w-4 mr-2" /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDeleteService(service.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {services.length === 0 && (
                                        <div className="col-span-2 text-center py-8 text-muted-foreground">
                                            No services found. Create one to allow users to book appointments.
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
