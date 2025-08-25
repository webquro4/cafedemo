import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-playfair font-bold text-gold">Lumière</h3>
            <p className="text-muted-foreground">
              Exquisite fine dining experience in the heart of the city. 
              Where culinary artistry meets exceptional service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-gold hover:bg-gold/10"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-gold" />
                <span>123 Fine Dining St, NYC 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-gold" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-gold" />
                <span>info@lumiere.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gold">Hours</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>Mon - Thu</span>
                <span>5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri - Sat</span>
                <span>5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>5:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Lumière Restaurant. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-muted-foreground hover:text-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-gold text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;