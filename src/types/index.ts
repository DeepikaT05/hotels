// User roles in the system
export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN', // Hotel Owner
    RECEPTIONIST = 'RECEPTIONIST', // Hotel Receptionist
    RESTAURANT_ADMIN = 'RESTAURANT_ADMIN', // Restaurant Manager
    GUEST = 'GUEST', // Hotel Guest
}

// User interface
export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    createdAt: Date;
    createdBy?: string; // ID of the user who created this account
    isActive: boolean;
}

// Room interface
export interface Room {
    id: string;
    roomNumber: string;
    type: 'DELUXE' | 'SUITE' | 'PRESIDENTIAL' | 'STANDARD';
    price: number;
    status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED';
    floor: number;
    amenities: string[];
    maxOccupancy: number;
    images: string[];
}

// Booking interface
export interface Booking {
    id: string;
    guestId: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    roomId: string;
    roomNumber: string;
    checkIn: Date;
    checkOut: Date;
    totalAmount: number;
    status: 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
    paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
    createdAt: Date;
    updatedAt: Date;
}

// Staff interface
export interface Staff {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'HOUSEKEEPING' | 'MAINTENANCE' | 'CONCIERGE' | 'SECURITY' | 'OTHER';
    shift: 'MORNING' | 'EVENING' | 'NIGHT';
    salary: number;
    joinDate: Date;
    isActive: boolean;
}

// Attendance interface
export interface Attendance {
    id: string;
    staffId: string;
    staffName: string;
    date: Date;
    checkIn?: Date;
    checkOut?: Date;
    status: 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'LEAVE';
    notes?: string;
}

// Menu Item interface
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    category: 'APPETIZER' | 'MAIN_COURSE' | 'DESSERT' | 'BEVERAGE' | 'BREAKFAST' | 'SNACKS';
    price: number;
    image?: string;
    isAvailable: boolean;
    preparationTime: number; // in minutes
    ingredients: string[];
}

// Order interface
export interface Order {
    id: string;
    orderNumber: string;
    source: 'ROOM' | 'TABLE';
    sourceNumber: string; // Room number or Table number
    items: OrderItem[];
    totalAmount: number;
    status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
    paymentStatus: 'PENDING' | 'PAID';
    createdAt: Date;
    updatedAt: Date;
    notes?: string;
}

export interface OrderItem {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
}

// Inventory interface
export interface InventoryItem {
    id: string;
    name: string;
    category: 'FOOD' | 'BEVERAGE' | 'SUPPLIES' | 'CLEANING' | 'OTHER';
    quantity: number;
    unit: string;
    minQuantity: number; // Alert threshold
    supplier?: string;
    lastRestocked: Date;
    cost: number;
}

// Invoice interface
export interface Invoice {
    id: string;
    invoiceNumber: string;
    type: 'BOOKING' | 'RESTAURANT' | 'BOTH';
    guestName: string;
    guestEmail: string;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentStatus: 'PENDING' | 'PAID' | 'PARTIAL';
    paymentMethod?: 'CASH' | 'CARD' | 'UPI' | 'BANK_TRANSFER';
    createdAt: Date;
    paidAt?: Date;
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

// Table interface
export interface Table {
    id: string;
    tableNumber: string;
    capacity: number;
    qrCode: string; // QR code data
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
}
