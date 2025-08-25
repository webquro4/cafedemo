import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  MenuIcon, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleSidebar } from "@/store/slices/adminSlice";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.admin);

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Reservations",
      href: "/admin/reservations",
      icon: Calendar,
    },
    {
      name: "Menu",
      href: "/admin/menu",
      icon: MenuIcon,
    },
    {
      name: "Staff",
      href: "/admin/staff",
      icon: Users,
    },
    {
      name: "Pages",
      href: "/admin/pages",
      icon: FileText,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Settings,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-playfair font-bold text-gold">
                Lumière Admin
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleSidebar())}
            className="text-muted-foreground hover:text-gold"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-gold text-primary-foreground"
                : "text-muted-foreground hover:text-gold hover:bg-gold/10"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="ml-3 truncate">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          to="/admin/settings"
          className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-gold hover:bg-gold/10 transition-colors"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="ml-3">Settings</span>}
        </Link>
        
        <Button
          variant="ghost"
          className="w-full justify-start px-3 py-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;