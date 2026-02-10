import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import {
    LayoutDashboard,
    Users,
    Bed,
    Calendar,
    UserCog,
    ClipboardList,
    UtensilsCrossed,
    ShoppingCart,
    Package,
    FileText,
    QrCode,
    LogOut,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AdminLayout = () => {
    const { user, logout, hasRole } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: '/admin',
            roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST, UserRole.RESTAURANT_ADMIN],
        },
        // Super Admin & Receptionist
        {
            title: 'Rooms',
            icon: Bed,
            path: '/admin/rooms',
            roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST],
        },
        {
            title: 'Bookings',
            icon: Calendar,
            path: '/admin/bookings',
            roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST],
        },
        {
            title: 'Guests',
            icon: Users,
            path: '/admin/guests',
            roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST],
        },
        {
            title: 'Staff',
            icon: UserCog,
            path: '/admin/staff',
            roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST],
        },
        {
            title: 'Attendance',
            icon: ClipboardList,
            path: '/admin/attendance',
            roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST],
        },
        // Super Admin Only
        {
            title: 'User Management',
            icon: Users,
            path: '/admin/users',
            roles: [UserRole.SUPER_ADMIN],
        },
        // Restaurant Admin
        {
            title: 'Menu',
            icon: UtensilsCrossed,
            path: '/admin/menu',
            roles: [UserRole.SUPER_ADMIN, UserRole.RESTAURANT_ADMIN],
        },
        {
            title: 'Orders',
            icon: ShoppingCart,
            path: '/admin/orders',
            roles: [UserRole.SUPER_ADMIN, UserRole.RESTAURANT_ADMIN],
        },
        {
            title: 'Inventory',
            icon: Package,
            path: '/admin/inventory',
            roles: [UserRole.SUPER_ADMIN, UserRole.RESTAURANT_ADMIN],
        },
        {
            title: 'QR Codes',
            icon: QrCode,
            path: '/admin/qr-codes',
            roles: [UserRole.SUPER_ADMIN, UserRole.RESTAURANT_ADMIN],
        },
        // All Admins
        {
            title: 'Invoices',
            icon: FileText,
            path: '/admin/invoices',
            roles: [UserRole.SUPER_ADMIN, UserRole.RECEPTIONIST, UserRole.RESTAURANT_ADMIN],
        },
    ];

    const filteredMenuItems = menuItems.filter((item) =>
        hasRole(item.roles)
    );

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-64' : 'w-20'
                    } bg-card border-r border-border transition-all duration-300 flex flex-col`}
            >
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg" />
                            <span className="font-display font-bold text-lg gradient-text">
                                Vivanz Palace
                            </span>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="hover:bg-primary/10"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {filteredMenuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors group"
                        >
                            <item.icon
                                size={20}
                                className="shrink-0 group-hover:scale-110 transition-transform"
                            />
                            {sidebarOpen && (
                                <span className="font-body text-sm">{item.title}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-primary/20 border-2 border-primary/30">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                                {user?.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        {sidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="font-body font-semibold text-sm truncate">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-muted-foreground capitalize">
                                    {user?.role.toLowerCase().replace('_', ' ')}
                                </p>
                            </div>
                        )}
                    </div>
                    {sidebarOpen && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="w-full mt-3 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                            <LogOut size={16} className="mr-2" />
                            Logout
                        </Button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
