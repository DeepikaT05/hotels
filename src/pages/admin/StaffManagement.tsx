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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, UserPlus, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Staff {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    department: 'Front Desk' | 'Housekeeping' | 'Kitchen' | 'Restaurant' | 'Maintenance';
    salary: number;
    joinDate: string;
    status: 'Active' | 'On Leave' | 'Inactive';
}

const StaffManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: 'Front Desk' as Staff['department'],
        salary: '',
        joinDate: '',
    });

    // Mock data
    const [staff, setStaff] = useState<Staff[]>([
        {
            id: '1',
            name: 'Ramesh Verma',
            email: 'ramesh.verma@vivanzpalace.com',
            phone: '+91-9876543210',
            position: 'Front Desk Manager',
            department: 'Front Desk',
            salary: 35000,
            joinDate: '2023-01-15',
            status: 'Active',
        },
        {
            id: '2',
            name: 'Sunita Devi',
            email: 'sunita.devi@vivanzpalace.com',
            phone: '+91-9876543211',
            position: 'Housekeeping Supervisor',
            department: 'Housekeeping',
            salary: 28000,
            joinDate: '2023-03-20',
            status: 'Active',
        },
        {
            id: '3',
            name: 'Vikram Singh',
            email: 'vikram.singh@vivanzpalace.com',
            phone: '+91-9876543212',
            position: 'Head Chef',
            department: 'Kitchen',
            salary: 45000,
            joinDate: '2022-11-10',
            status: 'Active',
        },
        {
            id: '4',
            name: 'Anjali Sharma',
            email: 'anjali.sharma@vivanzpalace.com',
            phone: '+91-9876543213',
            position: 'Waitress',
            department: 'Restaurant',
            salary: 22000,
            joinDate: '2024-01-05',
            status: 'On Leave',
        },
    ]);

    const filteredStaff = staff.filter(
        (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingStaff) {
            setStaff(
                staff.map((s) =>
                    s.id === editingStaff.id
                        ? {
                            ...s,
                            ...formData,
                            salary: parseFloat(formData.salary),
                        }
                        : s
                )
            );
            toast.success('Staff member updated successfully!');
        } else {
            const newStaff: Staff = {
                id: Date.now().toString(),
                ...formData,
                salary: parseFloat(formData.salary),
                status: 'Active',
            };
            setStaff([...staff, newStaff]);
            toast.success('Staff member added successfully!');
        }
        resetForm();
    };

    const handleEdit = (staff: Staff) => {
        setEditingStaff(staff);
        setFormData({
            name: staff.name,
            email: staff.email,
            phone: staff.phone,
            position: staff.position,
            department: staff.department,
            salary: staff.salary.toString(),
            joinDate: staff.joinDate,
        });
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setStaff(staff.filter((s) => s.id !== id));
        toast.success('Staff member removed successfully!');
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            position: '',
            department: 'Front Desk',
            salary: '',
            joinDate: '',
        });
        setEditingStaff(null);
        setDialogOpen(false);
    };

    const getStatusColor = (status: Staff['status']) => {
        switch (status) {
            case 'Active':
                return 'bg-green-500/10 text-green-700 border-green-500/20';
            case 'On Leave':
                return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
            case 'Inactive':
                return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
            default:
                return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
        }
    };

    const getDepartmentColor = (department: Staff['department']) => {
        const colors = {
            'Front Desk': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
            'Housekeeping': 'bg-purple-500/10 text-purple-700 border-purple-500/20',
            'Kitchen': 'bg-orange-500/10 text-orange-700 border-orange-500/20',
            'Restaurant': 'bg-pink-500/10 text-pink-700 border-pink-500/20',
            'Maintenance': 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20',
        };
        return colors[department];
    };

    const stats = [
        {
            title: 'Total Staff',
            value: staff.length.toString(),
            icon: UserPlus,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Active',
            value: staff.filter((s) => s.status === 'Active').length.toString(),
            icon: UserPlus,
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'On Leave',
            value: staff.filter((s) => s.status === 'On Leave').length.toString(),
            icon: UserPlus,
            color: 'from-yellow-500 to-orange-500',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                        Staff Management
                    </h1>
                    <p className="text-muted-foreground font-body">
                        Manage hotel staff and employees
                    </p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-accent">
                            <UserPlus size={18} className="mr-2" />
                            Add Staff
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="font-display text-2xl">
                                {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="position">Position</Label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="department">Department</Label>
                                    <Select
                                        value={formData.department}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, department: value as Staff['department'] })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Front Desk">Front Desk</SelectItem>
                                            <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                                            <SelectItem value="Kitchen">Kitchen</SelectItem>
                                            <SelectItem value="Restaurant">Restaurant</SelectItem>
                                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="salary">Salary (₹)</Label>
                                    <Input
                                        id="salary"
                                        type="number"
                                        value={formData.salary}
                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="joinDate">Join Date</Label>
                                    <Input
                                        id="joinDate"
                                        type="date"
                                        value={formData.joinDate}
                                        onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
                                    {editingStaff ? 'Update' : 'Add'} Staff
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
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

            {/* Search */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            placeholder="Search by name, email, position, or department..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Staff Table */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-display text-xl">All Staff Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Salary</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStaff.map((member) => (
                                <TableRow key={member.id} className="hover:bg-muted/50">
                                    <TableCell className="font-semibold">{member.name}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail size={14} className="text-muted-foreground" />
                                                <span className="text-xs">{member.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone size={14} className="text-muted-foreground" />
                                                <span className="text-xs">{member.phone}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.position}</TableCell>
                                    <TableCell>
                                        <Badge className={getDepartmentColor(member.department)} variant="outline">
                                            {member.department}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono">₹{member.salary.toLocaleString()}</TableCell>
                                    <TableCell className="text-sm">{member.joinDate}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(member.status)} variant="outline">
                                            {member.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(member.id)}
                                            >
                                                <Trash2 size={16} className="text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default StaffManagement;
