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
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage' | 'Breakfast';
    price: number;
    isVeg: boolean;
    isAvailable: boolean;
}

const MenuManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Main Course' as MenuItem['category'],
        price: '',
        isVeg: true,
    });

    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        {
            id: '1',
            name: 'Paneer Butter Masala',
            description: 'Rich and creamy cottage cheese curry',
            category: 'Main Course',
            price: 280,
            isVeg: true,
            isAvailable: true,
        },
        {
            id: '2',
            name: 'Chicken Biryani',
            description: 'Aromatic basmati rice with tender chicken',
            category: 'Main Course',
            price: 320,
            isVeg: false,
            isAvailable: true,
        },
        {
            id: '3',
            name: 'Gulab Jamun',
            description: 'Traditional Indian sweet dessert',
            category: 'Dessert',
            price: 120,
            isVeg: true,
            isAvailable: true,
        },
        {
            id: '4',
            name: 'Masala Dosa',
            description: 'Crispy rice crepe with spiced potato filling',
            category: 'Breakfast',
            price: 150,
            isVeg: true,
            isAvailable: false,
        },
    ]);

    const filteredItems = menuItems.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            setMenuItems(
                menuItems.map((item) =>
                    item.id === editingItem.id
                        ? {
                            ...item,
                            ...formData,
                            price: parseFloat(formData.price),
                        }
                        : item
                )
            );
            toast.success('Menu item updated successfully!');
        } else {
            const newItem: MenuItem = {
                id: Date.now().toString(),
                ...formData,
                price: parseFloat(formData.price),
                isAvailable: true,
            };
            setMenuItems([...menuItems, newItem]);
            toast.success('Menu item added successfully!');
        }
        resetForm();
    };

    const handleEdit = (item: MenuItem) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price.toString(),
            isVeg: item.isVeg,
        });
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setMenuItems(menuItems.filter((item) => item.id !== id));
        toast.success('Menu item deleted successfully!');
    };

    const toggleAvailability = (id: string) => {
        setMenuItems(
            menuItems.map((item) =>
                item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
            )
        );
        toast.success('Availability updated!');
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category: 'Main Course',
            price: '',
            isVeg: true,
        });
        setEditingItem(null);
        setDialogOpen(false);
    };

    const stats = [
        {
            title: 'Total Items',
            value: menuItems.length.toString(),
            icon: UtensilsCrossed,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Available',
            value: menuItems.filter((i) => i.isAvailable).length.toString(),
            icon: UtensilsCrossed,
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Vegetarian',
            value: menuItems.filter((i) => i.isVeg).length.toString(),
            icon: UtensilsCrossed,
            color: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                        Menu Management
                    </h1>
                    <p className="text-muted-foreground font-body">
                        Manage restaurant menu items
                    </p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-accent">
                            <Plus size={18} className="mr-2" />
                            Add Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="font-display text-2xl">
                                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Item Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, category: value as MenuItem['category'] })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Appetizer">Appetizer</SelectItem>
                                            <SelectItem value="Main Course">Main Course</SelectItem>
                                            <SelectItem value="Dessert">Dessert</SelectItem>
                                            <SelectItem value="Beverage">Beverage</SelectItem>
                                            <SelectItem value="Breakfast">Breakfast</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="price">Price (₹)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isVeg"
                                    checked={formData.isVeg}
                                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <Label htmlFor="isVeg">Vegetarian</Label>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
                                    {editingItem ? 'Update' : 'Add'} Item
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

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

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            placeholder="Search menu items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/50 border-2 border-border hover:border-primary/40 focus:border-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-display text-xl">Menu Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow key={item.id} className="hover:bg-muted/50">
                                    <TableCell className="font-semibold">{item.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                                        {item.description}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{item.category}</Badge>
                                    </TableCell>
                                    <TableCell className="font-mono font-semibold">₹{item.price}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                item.isVeg
                                                    ? 'bg-green-500/10 text-green-700 border-green-500/20'
                                                    : 'bg-red-500/10 text-red-700 border-red-500/20'
                                            }
                                        >
                                            {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleAvailability(item.id)}
                                            className={
                                                item.isAvailable
                                                    ? 'text-green-600 hover:text-green-700'
                                                    : 'text-red-600 hover:text-red-700'
                                            }
                                        >
                                            {item.isAvailable ? 'Available' : 'Unavailable'}
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(item.id)}
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

export default MenuManagement;
