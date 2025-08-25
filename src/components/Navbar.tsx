import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openReservationModal } from "@/store/slices/reservationSlice";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Chefs", href: "/chefs" },
    { name: "Catalog", href: "/catalog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleReservation = () => {
    dispatch(openReservationModal());
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-playfair font-bold text-gold"
            >
              Lumière
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "text-gold"
                    : "text-foreground hover:text-gold"
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReservation}
              className="border-gold text-gold hover:bg-gold hover:text-background"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Reserve
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gold hover:text-gold hover:bg-gold/10"
            >
              <Phone className="w-4 h-4 mr-2" />
              (555) 123-4567
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gold"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "text-gold bg-gold/10"
                      : "text-foreground hover:text-gold hover:bg-gold/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button
                  onClick={handleReservation}
                  className="w-full bg-gold text-background hover:bg-gold-dark"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Make Reservation
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gold text-gold hover:bg-gold hover:text-background"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;