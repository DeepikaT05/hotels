import { useState } from 'react';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Clock, MapPin, CheckCircle2, XCircle, ChefHat } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const OrdersManagement = () => {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: '1',
            orderNumber: 'ORD-001',
            source: 'ROOM',
            sourceNumber: '205',
            items: [
                {
                    menuItemId: '1',
                    name: 'Butter Chicken',
                    quantity: 2,
                    price: 450,
                },
                { menuItemId: '2', name: 'Naan', quantity: 4, price: 40 },
            ],
            totalAmount: 1060,
            status: 'PREPARING',
            paymentStatus: 'PENDING',
            createdAt: new Date(Date.now() - 15 * 60000),
            updatedAt: new Date(),
            notes: 'Extra spicy',
        },
        {
            id: '2',
            orderNumber: 'ORD-002',
            source: 'TABLE',
            sourceNumber: '12',
            items: [
                { menuItemId: '3', name: 'Paneer Tikka', quantity: 1, price: 380 },
                { menuItemId: '4', name: 'Dal Makhani', quantity: 1, price: 320 },
            ],
            totalAmount: 700,
            status: 'READY',
            paymentStatus: 'PAID',
            createdAt: new Date(Date.now() - 25 * 60000),
            updatedAt: new Date(),
        },
        {
            id: '3',
            orderNumber: 'ORD-003',
            source: 'ROOM',
            sourceNumber: '310',
            items: [
                { menuItemId: '5', name: 'Biryani', quantity: 1, price: 420 },
                { menuItemId: '6', name: 'Raita', quantity: 1, price: 80 },
            ],
            totalAmount: 500,
            status: 'PENDING',
            paymentStatus: 'PENDING',
            createdAt: new Date(Date.now() - 5 * 60000),
            updatedAt: new Date(),
        },
    ]);

    const [filterStatus, setFilterStatus] = useState<string>('ALL');

    const updateOrderStatus = (
        orderId: string,
        newStatus: Order['status']
    ) => {
        setOrders(
            orders.map((order) =>
                order.id === orderId
                    ? { ...order, status: newStatus, updatedAt: new Date() }
                    : order
            )
        );
        toast.success(`Order status updated to ${newStatus}!`);
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'PREPARING':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'READY':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'DELIVERED':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'CANCELLED':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-muted';
        }
    };

    const getPaymentStatusColor = (status: Order['paymentStatus']) => {
        return status === 'PAID'
            ? 'bg-green-500/20 text-green-400 border-green-500/30'
            : 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    };

    const getTimeAgo = (date: Date) => {
        const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} min ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    };

    const filteredOrders =
        filterStatus === 'ALL'
            ? orders
            : orders.filter((order) => order.status === filterStatus);

    const stats = [
        {
            label: 'Pending',
            count: orders.filter((o) => o.status === 'PENDING').length,
            color: 'text-yellow-400',
        },
        {
            label: 'Preparing',
            count: orders.filter((o) => o.status === 'PREPARING').length,
            color: 'text-blue-400',
        },
        {
            label: 'Ready',
            count: orders.filter((o) => o.status === 'READY').length,
            color: 'text-green-400',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold gradient-text">
                    Orders Management
                </h1>
                <p className="text-muted-foreground font-body mt-1">
                    Real-time order tracking and status updates
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-primary/20 bg-card/50">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground font-body">
                                            {stat.label}
                                        </p>
                                        <p className={`text-3xl font-display font-bold ${stat.color}`}>
                                            {stat.count}
                                        </p>
                                    </div>
                                    <ChefHat className={`w-10 h-10 ${stat.color} opacity-50`} />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Filter */}
            <Card className="border-primary/20 bg-card/50">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-body font-medium">
                            Filter by Status:
                        </label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-[200px] bg-muted border-primary/20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Orders</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="PREPARING">Preparing</SelectItem>
                                <SelectItem value="READY">Ready</SelectItem>
                                <SelectItem value="DELIVERED">Delivered</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Orders List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredOrders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-primary/20 bg-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <div>
                                        <CardTitle className="font-display text-xl flex items-center gap-2">
                                            {order.orderNumber}
                                            <Badge
                                                variant="outline"
                                                className={getStatusColor(order.status)}
                                            >
                                                {order.status}
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-4 mt-2">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                {order.source === 'ROOM' ? 'Room' : 'Table'}{' '}
                                                {order.sourceNumber}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {getTimeAgo(order.createdAt)}
                                            </span>
                                        </CardDescription>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={getPaymentStatusColor(order.paymentStatus)}
                                    >
                                        {order.paymentStatus}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Order Items */}
                                <div className="space-y-2 mb-4">
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center p-2 rounded bg-muted/50"
                                        >
                                            <div>
                                                <span className="font-semibold">{item.name}</span>
                                                <span className="text-muted-foreground ml-2">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                            <span className="font-semibold text-primary">
                                                ₹{item.price * item.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Notes */}
                                {order.notes && (
                                    <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded">
                                        <p className="text-sm">
                                            <span className="font-semibold text-accent">Note:</span>{' '}
                                            {order.notes}
                                        </p>
                                    </div>
                                )}

                                {/* Total & Actions */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-primary/10">
                                    <div className="text-xl font-display font-bold">
                                        Total:{' '}
                                        <span className="gradient-text">₹{order.totalAmount}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {order.status === 'PENDING' && (
                                            <Button
                                                size="sm"
                                                onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                                                className="bg-blue-500 hover:bg-blue-600"
                                            >
                                                <ChefHat size={16} className="mr-1" />
                                                Start Preparing
                                            </Button>
                                        )}
                                        {order.status === 'PREPARING' && (
                                            <Button
                                                size="sm"
                                                onClick={() => updateOrderStatus(order.id, 'READY')}
                                                className="bg-green-500 hover:bg-green-600"
                                            >
                                                <CheckCircle2 size={16} className="mr-1" />
                                                Mark Ready
                                            </Button>
                                        )}
                                        {order.status === 'READY' && (
                                            <Button
                                                size="sm"
                                                onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                                                className="bg-purple-500 hover:bg-purple-600"
                                            >
                                                <CheckCircle2 size={16} className="mr-1" />
                                                Mark Delivered
                                            </Button>
                                        )}
                                        {order.status !== 'CANCELLED' &&
                                            order.status !== 'DELIVERED' && (
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        updateOrderStatus(order.id, 'CANCELLED')
                                                    }
                                                >
                                                    <XCircle size={16} className="mr-1" />
                                                    Cancel
                                                </Button>
                                            )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OrdersManagement;
