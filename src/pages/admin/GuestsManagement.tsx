import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, UserPlus, Mail, Phone, MapPin, Calendar, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Guest {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    idProof: string;
    checkIn: string;
    checkOut: string;
    roomNumber: string;
    totalBookings: number;
    status: 'Checked In' | 'Checked Out' | 'Upcoming';
}

const GuestsManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    // Mock data
    const [guests] = useState<Guest[]>([
        {
            id: '1',
            name: 'Rajesh Kumar',
            email: 'rajesh.kumar@email.com',
            phone: '+91-9876543210',
            address: 'Mumbai, Maharashtra',
            idProof: 'Aadhar: 1234-5678-9012',
            checkIn: '2024-02-08',
            checkOut: '2024-02-12',
            roomNumber: '205',
            totalBookings: 5,
            status: 'Checked In',
        },
        {
            id: '2',
            name: 'Priya Sharma',
            email: 'priya.sharma@email.com',
            phone: '+91-9876543211',
            address: 'Delhi, India',
            idProof: 'Passport: AB1234567',
            checkIn: '2024-02-10',
            checkOut: '2024-02-15',
            roomNumber: '310',
            totalBookings: 3,
            status: 'Upcoming',
        },
        {
            id: '3',
            name: 'Amit Patel',
            email: 'amit.patel@email.com',
            phone: '+91-9876543212',
            address: 'Ahmedabad, Gujarat',
            idProof: 'Aadhar: 9876-5432-1098',
            checkIn: '2024-02-05',
            checkOut: '2024-02-08',
            roomNumber: '102',
            totalBookings: 8,
            status: 'Checked Out',
        },
    ]);

    const filteredGuests = guests.filter(
        (guest) =>
            guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guest.phone.includes(searchQuery) ||
            guest.roomNumber.includes(searchQuery)
    );

    const handleViewGuest = (guest: Guest) => {
        setSelectedGuest(guest);
        setViewDialogOpen(true);
    };

    const getStatusColor = (status: Guest['status']) => {
        switch (status) {
            case 'Checked In':
                return 'bg-green-500/10 text-green-700 border-green-500/20';
            case 'Checked Out':
                return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
            case 'Upcoming':
                return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
            default:
                return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
        }
    };

    const stats = [
        {
            title: 'Total Guests',
            value: guests.length.toString(),
            icon: UserPlus,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Checked In',
            value: guests.filter((g) => g.status === 'Checked In').length.toString(),
            icon: Calendar,
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Upcoming',
            value: guests.filter((g) => g.status === 'Upcoming').length.toString(),
            icon: Calendar,
            color: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                    Guest Management
                </h1>
                <p className="text-muted-foreground font-body">
                    Manage and track all hotel guests
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-body font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                                    <stat.icon className="w-4 h-4 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-display font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Search and Filters */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                placeholder="Search by name, email, phone, or room number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Guests Table */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-display text-xl">All Guests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Guest Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Room</TableHead>
                                <TableHead>Check In</TableHead>
                                <TableHead>Check Out</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Total Bookings</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGuests.map((guest) => (
                                <TableRow key={guest.id} className="hover:bg-muted/50">
                                    <TableCell className="font-semibold">{guest.name}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail size={14} className="text-muted-foreground" />
                                                <span className="text-xs">{guest.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone size={14} className="text-muted-foreground" />
                                                <span className="text-xs">{guest.phone}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono">
                                            {guest.roomNumber}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{guest.checkIn}</TableCell>
                                    <TableCell className="text-sm">{guest.checkOut}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(guest.status)} variant="outline">
                                            {guest.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">{guest.totalBookings}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleViewGuest(guest)}
                                        >
                                            <Eye size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* View Guest Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="font-display text-2xl">Guest Details</DialogTitle>
                    </DialogHeader>
                    {selectedGuest && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground text-xs">Full Name</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.name}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">Room Number</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.roomNumber}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">Email</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.email}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">Phone</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.phone}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">Address</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.address}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">ID Proof</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.idProof}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">Check In</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.checkIn}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">Check Out</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.checkOut}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">Status</Label>
                                    <Badge className={`${getStatusColor(selectedGuest.status)} mt-1`} variant="outline">
                                        {selectedGuest.status}
                                    </Badge>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs">Total Bookings</Label>
                                    <p className="font-semibold mt-1">{selectedGuest.totalBookings}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GuestsManagement;
