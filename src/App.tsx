import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Dining from "./pages/Dining";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import About from "./pages/About";
import Events from "./pages/Events";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import RoomsManagement from "./pages/admin/RoomsManagement";
import BookingsManagement from "./pages/admin/BookingsManagement";
import GuestsManagement from "./pages/admin/GuestsManagement";
import StaffManagement from "./pages/admin/StaffManagement";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import MenuManagement from "./pages/admin/MenuManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import InvoicesManagement from "./pages/admin/InvoicesManagement";
import QRCodeManagement from "./pages/admin/QRCodeManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="rooms" element={<RoomsManagement />} />
              <Route path="bookings" element={<BookingsManagement />} />
              <Route path="guests" element={<GuestsManagement />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="attendance" element={<AttendanceManagement />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="orders" element={<OrdersManagement />} />
              <Route path="inventory" element={<OrdersManagement />} />
              <Route path="invoices" element={<InvoicesManagement />} />
              <Route path="qr-codes" element={<QRCodeManagement />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
