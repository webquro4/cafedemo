import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

// Pages
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Chefs from "./pages/Chefs";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminPurchases from "./pages/admin/AdminPurchases";
import AdminBills from "./pages/admin/AdminBills";
import AdminSuppliers from "./pages/admin/AdminSuppliers";
import AdminStaff from "./pages/admin/AdminStaff";
import AdminPages from "./pages/admin/AdminPages";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from "./pages/admin/AdminProfile";

// Components
import Layout from "./components/Layout";
import ReservationModal from "./components/ReservationModal";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Website Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="menu" element={<Menu />} />
                <Route path="about" element={<About />} />
                <Route path="chefs" element={<Chefs />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="contact" element={<Contact />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="reservations" element={<AdminReservations />} />
                <Route path="menu" element={<AdminMenu />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="invoices" element={<AdminInvoices />} />
                <Route path="purchases" element={<AdminPurchases />} />
                <Route path="bills" element={<AdminBills />} />
                <Route path="suppliers" element={<AdminSuppliers />} />
                <Route path="staff" element={<AdminStaff />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ReservationModal />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
