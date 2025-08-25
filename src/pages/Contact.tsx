import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: "123 Fine Dining Street\nNew York, NY 10001",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-4567",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@lumiere.com\nreservations@lumiere.com",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Thu: 5:00 PM - 10:00 PM\nFri-Sat: 5:00 PM - 11:00 PM\nSun: 5:00 PM - 9:00 PM",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team for reservations, private events, 
              or any questions about your dining experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="luxury-card text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold mb-3">
                      {info.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                      {info.details}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="luxury-card">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-playfair font-bold mb-6">
                    Send us a <span className="text-gold">Message</span>
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-input border-border focus:border-gold"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-input border-border focus:border-gold"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-border focus:border-gold"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-border focus:border-gold resize-none"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold text-primary-foreground hover:bg-gold-dark"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="luxury-card h-full">
                <CardContent className="p-0 h-full">
                  <div className="aspect-square lg:h-full bg-muted rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gold/20 to-background flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-gold mx-auto mb-4" />
                        <p className="text-gold font-playfair text-xl">Interactive Map</p>
                        <p className="text-muted-foreground mt-2">
                          123 Fine Dining Street<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-playfair font-bold">
              Getting <span className="text-gold">Here</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of Manhattan, Lumière is easily accessible by subway, 
              taxi, or car. Valet parking is available for your convenience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <h3 className="font-semibold text-gold mb-2">By Subway</h3>
                <p className="text-sm text-muted-foreground">
                  4, 5, 6 trains to Union Square<br />
                  2 blocks north on Broadway
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gold mb-2">Parking</h3>
                <p className="text-sm text-muted-foreground">
                  Complimentary valet service<br />
                  Available 5:00 PM - 12:00 AM
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gold mb-2">By Car</h3>
                <p className="text-sm text-muted-foreground">
                  Easy access from FDR Drive<br />
                  GPS: 123 Fine Dining St, NYC
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;