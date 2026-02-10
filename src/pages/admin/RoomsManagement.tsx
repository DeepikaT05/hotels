import { useState } from 'react';
import { Room } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bed, Edit, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const RoomsManagement = () => {
    const [rooms, setRooms] = useState<Room[]>([
        {
            id: '1',
            roomNumber: '101',
            type: 'DELUXE',
            price: 3500,
            status: 'AVAILABLE',
            floor: 1,
            amenities: ['AC', 'TV', 'WiFi', 'Mini Bar'],
            maxOccupancy: 2,
            images: [],
        },
        {
            id: '2',
            roomNumber: '205',
            type: 'SUITE',
            price: 6500,
            status: 'OCCUPIED',
            floor: 2,
            amenities: ['AC', 'TV', 'WiFi', 'Mini Bar', 'Jacuzzi'],
            maxOccupancy: 4,
            images: [],
        },
        {
            id: '3',
            roomNumber: '310',
            type: 'PRESIDENTIAL',
            price: 12000,
            status: 'RESERVED',
            floor: 3,
            amenities: ['AC', 'TV', 'WiFi', 'Mini Bar', 'Jacuzzi', 'Kitchen'],
            maxOccupancy: 6,
            images: [],
        },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('ALL');

    const [formData, setFormData] = useState({
        roomNumber: '',
        type: 'DELUXE' as Room['type'],
        price: 0,
        status: 'AVAILABLE' as Room['status'],
        floor: 1,
        maxOccupancy: 2,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingRoom) {
            setRooms(
                rooms.map((r) =>
                    r.id === editingRoom.id
                        ? {
                            ...r,
                            ...formData,
                            amenities: editingRoom.amenities,
                            images: editingRoom.images,
                        }
                        : r
                )
            );
            toast.success('Room updated successfully!');
        } else {
            const newRoom: Room = {
                id: Date.now().toString(),
                ...formData,
                amenities: ['AC', 'TV', 'WiFi'],
                images: [],
            };
            setRooms([...rooms, newRoom]);
            toast.success('Room created successfully!');
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            roomNumber: '',
            type: 'DELUXE',
            price: 0,
            status: 'AVAILABLE',
            floor: 1,
            maxOccupancy: 2,
        });
        setEditingRoom(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (room: Room) => {
        setEditingRoom(room);
        setFormData({
            roomNumber: room.roomNumber,
            type: room.type,
            price: room.price,
            status: room.status,
            floor: room.floor,
            maxOccupancy: room.maxOccupancy,
        });
        setIsDialogOpen(true);
    };

    const updateRoomStatus = (roomId: string, newStatus: Room['status']) => {
        setRooms(
            rooms.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r))
        );
        toast.success('Room status updated!');
    };

    const getStatusColor = (status: Room['status']) => {
        switch (status) {
            case 'AVAILABLE':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'OCCUPIED':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'RESERVED':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'MAINTENANCE':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            default:
                return 'bg-muted';
        }
    };

    const filteredRooms = rooms.filter((room) => {
        const matchesSearch =
            room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            filterStatus === 'ALL' || room.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = [
        {
            label: 'Available',
            count: rooms.filter((r) => r.status === 'AVAILABLE').length,
            color: 'text-green-400',
        },
        {
            label: 'Occupied',
            count: rooms.filter((r) => r.status === 'OCCUPIED').length,
            color: 'text-red-400',
        },
        {
            label: 'Reserved',
            count: rooms.filter((r) => r.status === 'RESERVED').length,
            color: 'text-blue-400',
        },
        {
            label: 'Maintenance',
            count: rooms.filter((r) => r.status === 'MAINTENANCE').length,
            color: 'text-yellow-400',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold gradient-text">
                        Rooms Management
                    </h1>
                    <p className="text-muted-foreground font-body mt-1">
                        Manage hotel rooms and their availability
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                            <Plus size={18} className="mr-2" />
                            Add Room
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-card border-primary/20">
                        <DialogHeader>
                            <DialogTitle className="font-display text-2xl">
                                {editingRoom ? 'Edit Room' : 'Add New Room'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingRoom
                                    ? 'Update room information'
                                    : 'Add a new room to the hotel'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="roomNumber">Room Number</Label>
                                    <Input
                                        id="roomNumber"
                                        value={formData.roomNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, roomNumber: e.target.value })
                                        }
                                        placeholder="101"
                                        className="bg-muted border-primary/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="floor">Floor</Label>
                                    <Input
                                        id="floor"
                                        type="number"
                                        value={formData.floor}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                floor: parseInt(e.target.value),
                                            })
                                        }
                                        className="bg-muted border-primary/20"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Room Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, type: value as Room['type'] })
                                    }
                                >
                                    <SelectTrigger className="bg-muted border-primary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="STANDARD">Standard</SelectItem>
                                        <SelectItem value="DELUXE">Deluxe</SelectItem>
                                        <SelectItem value="SUITE">Suite</SelectItem>
                                        <SelectItem value="PRESIDENTIAL">Presidential</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price per Night (₹)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                price: parseInt(e.target.value),
                                            })
                                        }
                                        className="bg-muted border-primary/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="maxOccupancy">Max Occupancy</Label>
                                    <Input
                                        id="maxOccupancy"
                                        type="number"
                                        value={formData.maxOccupancy}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                maxOccupancy: parseInt(e.target.value),
                                            })
                                        }
                                        className="bg-muted border-primary/20"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            status: value as Room['status'],
                                        })
                                    }
                                >
                                    <SelectTrigger className="bg-muted border-primary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AVAILABLE">Available</SelectItem>
                                        <SelectItem value="OCCUPIED">Occupied</SelectItem>
                                        <SelectItem value="RESERVED">Reserved</SelectItem>
                                        <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                                >
                                    {editingRoom ? 'Update' : 'Create'} Room
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                                <p className={`text-3xl font-display font-bold ${stat.color}`}>
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
                                placeholder="Search by room number or type..."
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
                                <SelectItem value="ALL">All Rooms</SelectItem>
                                <SelectItem value="AVAILABLE">Available</SelectItem>
                                <SelectItem value="OCCUPIED">Occupied</SelectItem>
                                <SelectItem value="RESERVED">Reserved</SelectItem>
                                <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => (
                    <motion.div
                        key={room.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="border-primary/20 bg-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="font-display text-2xl flex items-center gap-2">
                                            <Bed size={24} className="text-primary" />
                                            {room.roomNumber}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Floor {room.floor} • {room.type}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className={getStatusColor(room.status)}>
                                        {room.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Price/Night:</span>
                                        <span className="font-semibold text-primary">
                                            ₹{room.price}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Max Guests:</span>
                                        <span className="font-semibold">{room.maxOccupancy}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {room.amenities.slice(0, 4).map((amenity) => (
                                        <Badge
                                            key={amenity}
                                            variant="secondary"
                                            className="bg-muted/50"
                                        >
                                            {amenity}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(room)}
                                        className="flex-1 border-primary/20 hover:bg-primary/10"
                                    >
                                        <Edit size={14} className="mr-1" />
                                        Edit
                                    </Button>
                                    <Select
                                        value={room.status}
                                        onValueChange={(value) =>
                                            updateRoomStatus(room.id, value as Room['status'])
                                        }
                                    >
                                        <SelectTrigger className="flex-1 h-9 text-xs bg-muted border-primary/20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AVAILABLE">Available</SelectItem>
                                            <SelectItem value="OCCUPIED">Occupied</SelectItem>
                                            <SelectItem value="RESERVED">Reserved</SelectItem>
                                            <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RoomsManagement;
