import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Bed,
    Calendar,
    Users,
    DollarSign,
    TrendingUp,
    ShoppingCart,
    Package,
    UserCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { user, hasRole } = useAuth();

    const stats = [
        // Hotel Stats
        ...(hasRole([UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST])
            ? [
                {
                    title: 'Total Rooms',
                    value: '48',
                    icon: Bed,
                    change: '+2 this month',
                    color: 'from-blue to-blue-light',
                },
                {
                    title: 'Active Bookings',
                    value: '32',
                    icon: Calendar,
                    change: '+8 from yesterday',
                    color: 'from-cyan to-accent',
                },
                {
                    title: 'Total Guests',
                    value: '156',
                    icon: Users,
                    change: '+12 this week',
                    color: 'from-purple to-primary',
                },
                {
                    title: 'Revenue (Hotel)',
                    value: '₹2.4L',
                    icon: DollarSign,
                    change: '+15% this month',
                    color: 'from-primary to-cyan',
                },
            ]
            : []),
        // Restaurant Stats
        ...(hasRole([UserRole.SUPER_ADMIN, UserRole.RESTAURANT_ADMIN])
            ? [
                {
                    title: 'Active Orders',
                    value: '18',
                    icon: ShoppingCart,
                    change: '+5 in last hour',
                    color: 'from-accent to-cyan',
                },
                {
                    title: 'Menu Items',
                    value: '87',
                    icon: Package,
                    change: '12 out of stock',
                    color: 'from-purple to-blue',
                },
                {
                    title: 'Revenue (Restaurant)',
                    value: '₹85K',
                    icon: TrendingUp,
                    change: '+22% this week',
                    color: 'from-primary to-accent',
                },
            ]
            : []),
        // Staff Stats (Super Admin & Receptionist)
        ...(hasRole([UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST])
            ? [
                {
                    title: 'Staff Present',
                    value: '42/48',
                    icon: UserCheck,
                    change: '87.5% attendance',
                    color: 'from-cyan to-primary',
                },
            ]
            : []),
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                    Welcome back, {user?.name}!
                </h1>
                <p className="text-muted-foreground font-body">
                    Here's what's happening with your{' '}
                    {user?.role === UserRole.SUPER_ADMIN
                        ? 'hotel'
                        : user?.role === UserRole.RECEPTIONIST
                            ? 'front desk'
                            : 'restaurant'}{' '}
                    today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-body font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div
                                    className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform`}
                                >
                                    <stat.icon className="w-4 h-4 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-display font-bold mb-1">
                                    {stat.value}
                                </div>
                                <p className="text-xs text-muted-foreground font-body">
                                    {stat.change}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {hasRole([UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST]) && (
                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="font-display text-xl">
                                Recent Bookings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <div>
                                            <p className="font-body font-semibold">
                                                Room {100 + i}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Guest Name {i}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-primary">
                                                ₹{5000 + i * 1000}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                2 nights
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {hasRole([UserRole.SUPER_ADMIN, UserRole.RESTAURANT_ADMIN]) && (
                    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="font-display text-xl">
                                Recent Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { room: '205', status: 'Preparing', amount: 850 },
                                    { room: 'Table 12', status: 'Ready', amount: 1200 },
                                    { room: '310', status: 'Delivered', amount: 650 },
                                ].map((order, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <div>
                                            <p className="font-body font-semibold">{order.room}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.status}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-accent">
                                                ₹{order.amount}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {Math.floor(Math.random() * 30 + 5)} mins ago
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
