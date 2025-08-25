import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Clock, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/store";
import { 
  closeReservationModal, 
  updateReservationData, 
  setSubmitting,
  addReservation
} from "@/store/slices/reservationSlice";

const ReservationModal = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isModalOpen, currentReservation, isSubmitting } = useSelector(
    (state: RootState) => state.reservation
  );

  const handleClose = () => {
    dispatch(closeReservationModal());
  };

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateReservationData({ [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSubmitting(true));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add reservation to store
    dispatch(addReservation({
      id: Date.now().toString(),
      name: currentReservation.name || "",
      phone: currentReservation.phone || "",
      email: currentReservation.email || "",
      date: currentReservation.date || "",
      time: currentReservation.time || "",
      guests: currentReservation.guests || 2,
      status: 'pending'
    }));

    toast({
      title: "Reservation Confirmed!",
      description: "We'll send you a confirmation email shortly.",
    });

    dispatch(setSubmitting(false));
    dispatch(closeReservationModal());
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 17; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      timeSlots.push({ value: time, label: displayTime });
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
          <DialogOverlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded-xl shadow-elegant z-50 max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-playfair font-bold text-gold">
                    Make a Reservation
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Reserve your table for an unforgettable dining experience
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-gold"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gold">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        value={currentReservation.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10 bg-input border-border focus:border-gold"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gold">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={currentReservation.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 bg-input border-border focus:border-gold"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={currentReservation.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 bg-input border-border focus:border-gold"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gold">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={currentReservation.date || ""}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="pl-10 bg-input border-border focus:border-gold"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gold">Time</Label>
                    <Select onValueChange={(value) => handleInputChange("time", value)}>
                      <SelectTrigger className="bg-input border-border focus:border-gold">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gold">Guests</Label>
                    <Select onValueChange={(value) => handleInputChange("guests", value)}>
                      <SelectTrigger className="bg-input border-border focus:border-gold">
                        <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Party size" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                        <SelectItem value="9+">9+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Special Note */}
                <div className="p-4 bg-gold/5 border border-gold/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-gold">Please note:</strong> Reservations are held for 15 minutes past the reserved time. 
                    For parties of 8 or more, please call us directly at (555) 123-4567.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold text-primary-foreground hover:bg-gold-dark py-6 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Confirming Reservation...
                    </div>
                  ) : (
                    "Confirm Reservation"
                  )}
                </Button>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;