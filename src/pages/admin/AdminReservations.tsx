import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, CheckCircle, XCircle, Clock, Calendar, Users, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminReservations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const reservations = [
    {
      id: "1",
      name: "John Smith",
      email: "john@email.com",
      phone: "(555) 123-4567",
      date: "2024-01-20",
      time: "19:30",
      guests: 4,
      status: "confirmed",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "(555) 234-5678",
      date: "2024-01-20",
      time: "20:00",
      guests: 2,
      status: "pending",
      createdAt: "2024-01-16"
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@email.com",
      phone: "(555) 345-6789",
      date: "2024-01-21",
      time: "20:30",
      guests: 6,
      status: "confirmed",
      createdAt: "2024-01-17"
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@email.com",
      phone: "(555) 456-7890",
      date: "2024-01-21",
      time: "21:00",
      guests: 2,
      status: "cancelled",
      createdAt: "2024-01-18"
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "bg-green-500/10 text-green-500 border-green-500/20",
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {status}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-gold">Reservations</h1>
          <p className="text-muted-foreground">Manage all restaurant reservations</p>
        </div>
        <Button className="bg-gold text-primary-foreground hover:bg-gold-dark">
          <Calendar className="w-4 h-4 mr-2" />
          Add Reservation
        </Button>
      </div>

      {/* Filters */}
      <Card className="luxury-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border focus:border-gold"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-input border-border focus:border-gold">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="text-gold">All Reservations ({filteredReservations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReservations.map((reservation, index) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-muted/30 rounded-lg border border-border hover:border-gold/30 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gold/10 rounded-full">
                      {getStatusIcon(reservation.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-lg">{reservation.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {reservation.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {reservation.phone}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(reservation.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          {reservation.time}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="w-4 h-4 mr-2" />
                          {reservation.guests} guests
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between lg:justify-end space-x-4">
                    {getStatusBadge(reservation.status)}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Reservation</DropdownMenuItem>
                        <DropdownMenuItem>Confirm</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredReservations.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No reservations found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "No reservations have been made yet"
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReservations;