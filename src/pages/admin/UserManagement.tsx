import { useState } from 'react';
import { User, UserRole } from '@/types';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'John Doe',
            email: 'reception@vivanzpalace.com',
            role: UserRole.RECEPTIONIST,
            phone: '+91 9876543210',
            createdAt: new Date('2024-01-15'),
            isActive: true,
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'restaurant@vivanzpalace.com',
            role: UserRole.RESTAURANT_ADMIN,
            phone: '+91 9876543211',
            createdAt: new Date('2024-01-20'),
            isActive: true,
        },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: UserRole.RECEPTIONIST,
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            // Update existing user
            setUsers(
                users.map((u) =>
                    u.id === editingUser.id
                        ? {
                            ...u,
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            role: formData.role,
                        }
                        : u
                )
            );
            toast.success('User updated successfully!');
        } else {
            // Create new user
            const newUser: User = {
                id: Date.now().toString(),
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                createdAt: new Date(),
                isActive: true,
            };
            setUsers([...users, newUser]);
            toast.success('User created successfully!');
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            role: UserRole.RECEPTIONIST,
            password: '',
        });
        setEditingUser(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role,
            password: '',
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (userId: string) => {
        setUsers(users.filter((u) => u.id !== userId));
        toast.success('User deleted successfully!');
    };

    const toggleUserStatus = (userId: string) => {
        setUsers(
            users.map((u) =>
                u.id === userId ? { ...u, isActive: !u.isActive } : u
            )
        );
        toast.success('User status updated!');
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleBadgeColor = (role: UserRole) => {
        switch (role) {
            case UserRole.SUPER_ADMIN:
                return 'bg-gradient-to-r from-purple to-primary';
            case UserRole.RECEPTIONIST:
                return 'bg-gradient-to-r from-primary to-cyan';
            case UserRole.RESTAURANT_ADMIN:
                return 'bg-gradient-to-r from-accent to-cyan';
            default:
                return 'bg-muted';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold gradient-text">
                        User Management
                    </h1>
                    <p className="text-muted-foreground font-body mt-1">
                        Create and manage receptionists and restaurant admins
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                            <UserPlus className="mr-2" size={18} />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-card border-primary/20">
                        <DialogHeader>
                            <DialogTitle className="font-display text-2xl">
                                {editingUser ? 'Edit User' : 'Create New User'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingUser
                                    ? 'Update user information'
                                    : 'Add a new receptionist or restaurant admin'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    placeholder="Enter full name"
                                    className="bg-muted border-primary/20"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    placeholder="user@vivanzpalace.com"
                                    className="bg-muted border-primary/20"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    placeholder="+91 9876543210"
                                    className="bg-muted border-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, role: value as UserRole })
                                    }
                                >
                                    <SelectTrigger className="bg-muted border-primary/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={UserRole.RECEPTIONIST}>
                                            Receptionist
                                        </SelectItem>
                                        <SelectItem value={UserRole.RESTAURANT_ADMIN}>
                                            Restaurant Admin
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {!editingUser && (
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        placeholder="Enter password"
                                        className="bg-muted border-primary/20"
                                        required={!editingUser}
                                    />
                                </div>
                            )}
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
                                    {editingUser ? 'Update' : 'Create'} User
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search */}
            <Card className="border-primary/20 bg-card/50">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            size={18}
                        />
                        <Input
                            placeholder="Search users by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted border-primary/20"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="border-primary/20 bg-card/50">
                <CardHeader>
                    <CardTitle className="font-display">All Users</CardTitle>
                    <CardDescription>
                        {filteredUsers.length} user(s) found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-primary/20">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-primary/10 hover:bg-muted/50 transition-colors"
                                    >
                                        <TableCell className="font-semibold">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {user.phone || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`${getRoleBadgeColor(
                                                    user.role
                                                )} text-white border-0`}
                                            >
                                                {user.role.replace('_', ' ')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={user.isActive ? 'default' : 'secondary'}
                                                className={
                                                    user.isActive
                                                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                                                }
                                            >
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(user)}
                                                    className="hover:bg-primary/10 hover:text-primary"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleUserStatus(user.id)}
                                                    className="hover:bg-accent/10 hover:text-accent"
                                                >
                                                    <UserPlus size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(user.id)}
                                                    className="hover:bg-destructive/10 hover:text-destructive"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserManagement;
