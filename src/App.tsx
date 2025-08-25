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
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminPages from "./pages/admin/AdminPages";
import AdminUsers from "./pages/admin/AdminUsers";

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
                <Route path="gallery" element={<Gallery />} />
                <Route path="contact" element={<Contact />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="reservations" element={<AdminReservations />} />
                <Route path="menu" element={<AdminMenu />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="users" element={<AdminUsers />} />
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
