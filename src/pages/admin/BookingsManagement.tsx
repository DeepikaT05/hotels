import { useState } from 'react';
import { Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, CheckCircle2, XCircle, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const BookingsManagement = () => {
    const [bookings, setBookings] = useState<Booking[]>([
        {
            id: '1',
            guestId: '1',
            guestName: 'Rajesh Kumar',
            guestEmail: 'rajesh@example.com',
            guestPhone: '+91 9876543210',
            roomId: '1',
            roomNumber: '101',
            checkIn: new Date('2024-02-15'),
            checkOut: new Date('2024-02-18'),
            totalAmount: 10500,
            status: 'CONFIRMED',
            paymentStatus: 'PAID',
            createdAt: new Date('2024-02-10'),
            updatedAt: new Date('2024-02-10'),
        },
        {
            id: '2',
            guestId: '2',
            guestName: 'Priya Sharma',
            guestEmail: 'priya@example.com',
            guestPhone: '+91 9876543211',
            roomId: '2',
            roomNumber: '205',
            checkIn: new Date('2024-02-14'),
            checkOut: new Date('2024-02-16'),
            totalAmount: 13000,
            status: 'CHECKED_IN',
            paymentStatus: 'PAID',
            createdAt: new Date('2024-02-08'),
            updatedAt: new Date('2024-02-14'),
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('ALL');

    const updateBookingStatus = (
        bookingId: string,
        newStatus: Booking['status']
    ) => {
        setBookings(
            bookings.map((booking) =>
                booking.id === bookingId
                    ? { ...booking, status: newStatus, updatedAt: new Date() }
                    : booking
            )
        );
        toast.success(`Booking status updated to ${newStatus}!`);
    };

    const updatePaymentStatus = (
        bookingId: string,
        newStatus: Booking['paymentStatus']
    ) => {
        setBookings(
            bookings.map((booking) =>
                booking.id === bookingId
                    ? { ...booking, paymentStatus: newStatus, updatedAt: new Date() }
                    : booking
            )
        );
        toast.success(`Payment status updated!`);
    };

    const getStatusColor = (status: Booking['status']) => {
        switch (status) {
            case 'CONFIRMED':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'CHECKED_IN':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'CHECKED_OUT':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'CANCELLED':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-muted';
        }
    };

    const getPaymentStatusColor = (status: Booking['paymentStatus']) => {
        switch (status) {
            case 'PAID':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'PENDING':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'REFUNDED':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            default:
                return 'bg-muted';
        }
    };

    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.guestEmail.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            filterStatus === 'ALL' || booking.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = [
        {
            label: 'Confirmed',
            count: bookings.filter((b) => b.status === 'CONFIRMED').length,
            color: 'text-blue-400',
        },
        {
            label: 'Checked In',
            count: bookings.filter((b) => b.status === 'CHECKED_IN').length,
            color: 'text-green-400',
        },
        {
            label: 'Checked Out',
            count: bookings.filter((b) => b.status === 'CHECKED_OUT').length,
            color: 'text-purple-400',
        },
        {
            label: 'Total Revenue',
            count: `₹${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`,
            color: 'text-accent',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold gradient-text">
                    Bookings Management
                </h1>
                <p className="text-muted-foreground font-body mt-1">
                    Manage hotel bookings and guest check-ins
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-primary/20 bg-card/50">
                            <CardContent className="pt-6">
                                <p className="text-sm text-muted-foreground font-body">
                                    {stat.label}
                                </p>
                                <p className={`text-2xl md:text-3xl font-display font-bold ${stat.color}`}>
                                    {stat.count}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <Card className="border-primary/20 bg-card/50">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={18}
                            />
                            <Input
                                placeholder="Search by guest name, email, or room..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-muted border-primary/20"
                            />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="bg-muted border-primary/20">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Bookings</SelectItem>
                                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                <SelectItem value="CHECKED_IN">Checked In</SelectItem>
                                <SelectItem value="CHECKED_OUT">Checked Out</SelectItem>
                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Bookings List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((booking, index) => (
                    <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-primary/20 bg-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <div>
                                        <CardTitle className="font-display text-xl">
                                            {booking.guestName}
                                        </CardTitle>
                                        <CardDescription className="mt-1 space-y-1">
                                            <div>{booking.guestEmail}</div>
                                            <div>{booking.guestPhone}</div>
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className={getStatusColor(booking.status)}>
                                            {booking.status.replace('_', ' ')}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={getPaymentStatusColor(booking.paymentStatus)}
                                        >
                                            {booking.paymentStatus}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-muted-foreground">Room:</span>
                                            <span className="font-semibold text-primary">
                                                {booking.roomNumber}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar size={14} className="text-muted-foreground" />
                                            <span className="text-muted-foreground">Check-in:</span>
                                            <span className="font-semibold">
                                                {new Date(booking.checkIn).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar size={14} className="text-muted-foreground" />
                                            <span className="text-muted-foreground">Check-out:</span>
                                            <span className="font-semibold">
                                                {new Date(booking.checkOut).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <DollarSign size={14} className="text-muted-foreground" />
                                            <span className="text-muted-foreground">Total Amount:</span>
                                            <span className="font-semibold text-accent">
                                                ₹{booking.totalAmount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-muted-foreground">Nights:</span>
                                            <span className="font-semibold">
                                                {Math.ceil(
                                                    (new Date(booking.checkOut).getTime() -
                                                        new Date(booking.checkIn).getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
                                    {booking.status === 'CONFIRMED' && (
                                        <Button
                                            size="sm"
                                            onClick={() => updateBookingStatus(booking.id, 'CHECKED_IN')}
                                            className="bg-green-500 hover:bg-green-600"
                                        >
                                            <CheckCircle2 size={16} className="mr-1" />
                                            Check In
                                        </Button>
                                    )}
                                    {booking.status === 'CHECKED_IN' && (
                                        <Button
                                            size="sm"
                                            onClick={() => updateBookingStatus(booking.id, 'CHECKED_OUT')}
                                            className="bg-purple-500 hover:bg-purple-600"
                                        >
                                            <CheckCircle2 size={16} className="mr-1" />
                                            Check Out
                                        </Button>
                                    )}
                                    {booking.paymentStatus === 'PENDING' && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => updatePaymentStatus(booking.id, 'PAID')}
                                            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                                        >
                                            <DollarSign size={16} className="mr-1" />
                                            Mark Paid
                                        </Button>
                                    )}
                                    {booking.status !== 'CANCELLED' &&
                                        booking.status !== 'CHECKED_OUT' && (
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                                            >
                                                <XCircle size={16} className="mr-1" />
                                                Cancel Booking
                                            </Button>
                                        )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BookingsManagement;
