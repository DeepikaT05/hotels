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
import { Search, FileText, Download, Eye, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Invoice {
    id: string;
    invoiceNumber: string;
    customerName: string;
    type: 'Room' | 'Restaurant' | 'Both';
    amount: number;
    tax: number;
    total: number;
    date: string;
    status: 'Paid' | 'Pending' | 'Overdue';
}

const InvoicesManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [invoices] = useState<Invoice[]>([
        {
            id: '1',
            invoiceNumber: 'INV-2024-001',
            customerName: 'Rajesh Kumar',
            type: 'Both',
            amount: 15000,
            tax: 2700,
            total: 17700,
            date: '2024-02-08',
            status: 'Paid',
        },
        {
            id: '2',
            invoiceNumber: 'INV-2024-002',
            customerName: 'Priya Sharma',
            type: 'Room',
            amount: 8000,
            tax: 1440,
            total: 9440,
            date: '2024-02-09',
            status: 'Pending',
        },
        {
            id: '3',
            invoiceNumber: 'INV-2024-003',
            customerName: 'Amit Patel',
            type: 'Restaurant',
            amount: 2500,
            tax: 450,
            total: 2950,
            date: '2024-02-07',
            status: 'Paid',
        },
        {
            id: '4',
            invoiceNumber: 'INV-2024-004',
            customerName: 'Sunita Devi',
            type: 'Both',
            amount: 12000,
            tax: 2160,
            total: 14160,
            date: '2024-02-05',
            status: 'Overdue',
        },
    ]);

    const filteredInvoices = invoices.filter(
        (invoice) =>
            invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: Invoice['status']) => {
        switch (status) {
            case 'Paid':
                return 'bg-green-500/10 text-green-700 border-green-500/20';
            case 'Pending':
                return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
            case 'Overdue':
                return 'bg-red-500/10 text-red-700 border-red-500/20';
            default:
                return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
        }
    };

    const getTypeColor = (type: Invoice['type']) => {
        switch (type) {
            case 'Room':
                return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
            case 'Restaurant':
                return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
            case 'Both':
                return 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20';
            default:
                return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
        }
    };

    const handleDownload = (invoiceNumber: string) => {
        toast.success(`Downloading ${invoiceNumber}...`);
    };

    const handleView = (invoiceNumber: string) => {
        toast.info(`Viewing ${invoiceNumber}...`);
    };

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const paidAmount = invoices
        .filter((inv) => inv.status === 'Paid')
        .reduce((sum, inv) => sum + inv.total, 0);
    const pendingAmount = invoices
        .filter((inv) => inv.status === 'Pending' || inv.status === 'Overdue')
        .reduce((sum, inv) => sum + inv.total, 0);

    const stats = [
        {
            title: 'Total Revenue',
            value: `₹${(totalRevenue / 1000).toFixed(1)}K`,
            icon: DollarSign,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Paid',
            value: `₹${(paidAmount / 1000).toFixed(1)}K`,
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Pending',
            value: `₹${(pendingAmount / 1000).toFixed(1)}K`,
            icon: DollarSign,
            color: 'from-yellow-500 to-orange-500',
        },
        {
            title: 'Total Invoices',
            value: invoices.length.toString(),
            icon: FileText,
            color: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                    Invoice Management
                </h1>
                <p className="text-muted-foreground font-body">
                    Manage and track all invoices
                </p>
            </div>

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

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            placeholder="Search by invoice number or customer name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-display text-xl">All Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Tax (18%)</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInvoices.map((invoice) => (
                                <TableRow key={invoice.id} className="hover:bg-muted/50">
                                    <TableCell className="font-mono font-semibold">
                                        {invoice.invoiceNumber}
                                    </TableCell>
                                    <TableCell className="font-semibold">{invoice.customerName}</TableCell>
                                    <TableCell>
                                        <Badge className={getTypeColor(invoice.type)} variant="outline">
                                            {invoice.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{invoice.date}</TableCell>
                                    <TableCell className="font-mono">₹{invoice.amount.toLocaleString()}</TableCell>
                                    <TableCell className="font-mono text-sm text-muted-foreground">
                                        ₹{invoice.tax.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="font-mono font-bold text-primary">
                                        ₹{invoice.total.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(invoice.status)} variant="outline">
                                            {invoice.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleView(invoice.invoiceNumber)}
                                            >
                                                <Eye size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDownload(invoice.invoiceNumber)}
                                            >
                                                <Download size={16} />
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

export default InvoicesManagement;
