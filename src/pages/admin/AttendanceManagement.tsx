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
import { Calendar as CalendarIcon, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface AttendanceRecord {
    id: string;
    staffId: string;
    staffName: string;
    department: string;
    date: string;
    checkIn: string;
    checkOut: string | null;
    status: 'Present' | 'Absent' | 'Half Day' | 'On Leave';
    hoursWorked: number | null;
}

const AttendanceManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Mock data
    const [attendance] = useState<AttendanceRecord[]>([
        {
            id: '1',
            staffId: '1',
            staffName: 'Ramesh Verma',
            department: 'Front Desk',
            date: new Date().toISOString().split('T')[0],
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'Present',
            hoursWorked: 9,
        },
        {
            id: '2',
            staffId: '2',
            staffName: 'Sunita Devi',
            department: 'Housekeeping',
            date: new Date().toISOString().split('T')[0],
            checkIn: '08:30 AM',
            checkOut: null,
            status: 'Present',
            hoursWorked: null,
        },
        {
            id: '3',
            staffId: '3',
            staffName: 'Vikram Singh',
            department: 'Kitchen',
            date: new Date().toISOString().split('T')[0],
            checkIn: '07:00 AM',
            checkOut: '04:00 PM',
            status: 'Present',
            hoursWorked: 9,
        },
        {
            id: '4',
            staffId: '4',
            staffName: 'Anjali Sharma',
            department: 'Restaurant',
            date: new Date().toISOString().split('T')[0],
            checkIn: '-',
            checkOut: '-',
            status: 'On Leave',
            hoursWorked: 0,
        },
        {
            id: '5',
            staffId: '5',
            staffName: 'Rahul Kumar',
            department: 'Maintenance',
            date: new Date().toISOString().split('T')[0],
            checkIn: '10:00 AM',
            checkOut: '02:00 PM',
            status: 'Half Day',
            hoursWorked: 4,
        },
    ]);

    const filteredAttendance = attendance.filter(
        (record) =>
            record.date === selectedDate &&
            (record.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                record.department.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const getStatusColor = (status: AttendanceRecord['status']) => {
        switch (status) {
            case 'Present':
                return 'bg-green-500/10 text-green-700 border-green-500/20';
            case 'Absent':
                return 'bg-red-500/10 text-red-700 border-red-500/20';
            case 'Half Day':
                return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
            case 'On Leave':
                return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
            default:
                return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
        }
    };

    const stats = [
        {
            title: 'Present Today',
            value: filteredAttendance.filter((r) => r.status === 'Present').length.toString(),
            icon: CheckCircle,
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'On Leave',
            value: filteredAttendance.filter((r) => r.status === 'On Leave').length.toString(),
            icon: CalendarIcon,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Half Day',
            value: filteredAttendance.filter((r) => r.status === 'Half Day').length.toString(),
            icon: Clock,
            color: 'from-yellow-500 to-orange-500',
        },
        {
            title: 'Absent',
            value: filteredAttendance.filter((r) => r.status === 'Absent').length.toString(),
            icon: XCircle,
            color: 'from-red-500 to-pink-500',
        },
    ];

    const totalHours = filteredAttendance.reduce(
        (sum, record) => sum + (record.hoursWorked || 0),
        0
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                    Attendance Management
                </h1>
                <p className="text-muted-foreground font-body">
                    Track and manage staff attendance
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            {/* Summary Card */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Hours Worked Today</p>
                            <p className="text-3xl font-display font-bold gradient-text">{totalHours} hrs</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                            <p className="text-3xl font-display font-bold gradient-text">
                                {filteredAttendance.length > 0
                                    ? Math.round(
                                        (filteredAttendance.filter((r) => r.status === 'Present').length /
                                            filteredAttendance.length) *
                                        100
                                    )
                                    : 0}
                                %
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Search and Date Filter */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                placeholder="Search by staff name or department..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon size={18} className="text-muted-foreground" />
                            <Input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Attendance Table */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-display text-xl">
                        Attendance for {new Date(selectedDate).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Staff Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Check In</TableHead>
                                <TableHead>Check Out</TableHead>
                                <TableHead>Hours Worked</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAttendance.map((record) => (
                                <TableRow key={record.id} className="hover:bg-muted/50">
                                    <TableCell className="font-semibold">{record.staffName}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal">
                                            {record.department}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">{record.checkIn}</TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {record.checkOut || (
                                            <span className="text-muted-foreground italic">Not checked out</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        {record.hoursWorked !== null ? (
                                            `${record.hoursWorked} hrs`
                                        ) : (
                                            <span className="text-muted-foreground italic">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(record.status)} variant="outline">
                                            {record.status}
                                        </Badge>
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

export default AttendanceManagement;
