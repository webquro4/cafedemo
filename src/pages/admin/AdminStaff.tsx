import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Grid3X3, 
  List, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Clock,
  Edit,
  Trash2,
  User,
  ChefHat,
  Utensils,
  Coffee,
  Shield,
  Star,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const staff = [
    {
      id: "1",
      name: "Marcus Dubois",
      position: "Executive Chef",
      department: "kitchen",
      email: "marcus@lumiere.com",
      phone: "(555) 123-4567",
      address: "123 Chef St, NYC",
      salary: "$120,000",
      hireDate: "2020-01-15",
      schedule: "Mon-Sat 2PM-11PM",
      status: "active",
      avatar: null,
      skills: ["French Cuisine", "Molecular Gastronomy", "Team Leadership"],
      rating: 5,
      experience: "25+ years"
    },
    {
      id: "2",
      name: "Isabella Romano",
      position: "Pastry Chef",
      department: "kitchen",
      email: "isabella@lumiere.com",
      phone: "(555) 234-5678",
      address: "456 Sweet Ave, NYC",
      salary: "$85,000",
      hireDate: "2021-03-20",
      schedule: "Tue-Sun 6AM-3PM",
      status: "active",
      avatar: null,
      skills: ["Pastry Arts", "Sugar Work", "Chocolate"],
      rating: 5,
      experience: "15+ years"
    },
    {
      id: "3",
      name: "James Morrison",
      position: "General Manager",
      department: "management",
      email: "james@lumiere.com",
      phone: "(555) 345-6789",
      address: "789 Manager Blvd, NYC",
      salary: "$95,000",
      hireDate: "2019-11-10",
      schedule: "Mon-Fri 10AM-8PM",
      status: "active",
      avatar: null,
      skills: ["Operations", "Customer Service", "Staff Management"],
      rating: 4.8,
      experience: "18+ years"
    },
    {
      id: "4",
      name: "Sophie Chen",
      position: "Head Sommelier",
      department: "service",
      email: "sophie@lumiere.com",
      phone: "(555) 456-7890",
      address: "321 Wine St, NYC",
      salary: "$75,000",
      hireDate: "2022-02-14",
      schedule: "Wed-Sun 4PM-12AM",
      status: "active",
      avatar: null,
      skills: ["Wine Pairing", "Beverage Management", "Customer Education"],
      rating: 4.9,
      experience: "12+ years"
    },
    {
      id: "5",
      name: "Antonio Rodriguez",
      position: "Sous Chef",
      department: "kitchen",
      email: "antonio@lumiere.com",
      phone: "(555) 567-8901",
      address: "654 Culinary Way, NYC",
      salary: "$70,000",
      hireDate: "2021-08-05",
      schedule: "Mon-Sat 1PM-10PM",
      status: "active",
      avatar: null,
      skills: ["Mediterranean Cuisine", "Prep Management", "Quality Control"],
      rating: 4.7,
      experience: "12+ years"
    },
    {
      id: "6",
      name: "Maria Gonzalez",
      position: "Server",
      department: "service",
      email: "maria@lumiere.com",
      phone: "(555) 678-9012",
      address: "987 Service Rd, NYC",
      salary: "$45,000",
      hireDate: "2023-01-12",
      schedule: "Thu-Mon 5PM-11PM",
      status: "active",
      avatar: null,
      skills: ["Fine Dining Service", "Wine Knowledge", "Multilingual"],
      rating: 4.6,
      experience: "8+ years"
    },
    {
      id: "7",
      name: "David Kim",
      position: "Line Cook",
      department: "kitchen",
      email: "david@lumiere.com",
      phone: "(555) 789-0123",
      address: "147 Cook Lane, NYC",
      salary: "$55,000",
      hireDate: "2022-09-18",
      schedule: "Tue-Sat 3PM-11PM",
      status: "on_leave",
      avatar: null,
      skills: ["Grill Station", "Sauce Preparation", "Speed Cooking"],
      rating: 4.4,
      experience: "6+ years"
    },
    {
      id: "8",
      name: "Rachel Thompson",
      position: "Host",
      department: "service",
      email: "rachel@lumiere.com",
      phone: "(555) 890-1234",
      address: "258 Welcome St, NYC",
      salary: "$40,000",
      hireDate: "2023-06-01",
      schedule: "Wed-Sun 4PM-10PM",
      status: "active",
      avatar: null,
      skills: ["Customer Relations", "Reservation Management", "Problem Solving"],
      rating: 4.5,
      experience: "4+ years"
    }
  ];

  const departments = [
    { value: "all", label: "All Departments" },
    { value: "kitchen", label: "Kitchen" },
    { value: "service", label: "Service" },
    { value: "management", label: "Management" }
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "on_leave", label: "On Leave" },
    { value: "inactive", label: "Inactive" }
  ];

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'kitchen':
        return <ChefHat className="w-4 h-4" />;
      case 'service':
        return <Utensils className="w-4 h-4" />;
      case 'management':
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getDepartmentBadge = (department: string) => {
    const colors = {
      kitchen: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      service: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      management: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    };

    return (
      <Badge className={colors[department as keyof typeof colors] || "bg-gray-500/10 text-gray-500"}>
        <div className="flex items-center">
          {getDepartmentIcon(department)}
          <span className="ml-1 capitalize">{department}</span>
        </div>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-500/10 text-green-500 border-green-500/20",
      on_leave: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      inactive: "bg-red-500/10 text-red-500 border-red-500/20"
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.inactive}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-gold text-gold' : 'text-muted-foreground'}`} />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-gold">Staff Management</h1>
          <p className="text-muted-foreground">Manage restaurant staff and employee information</p>
        </div>
        <Button className="bg-gold text-primary-foreground hover:bg-gold-dark">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Filters and View Controls */}
      <Card className="luxury-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search staff by name, position, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-gold"
                  />
                </div>
              </div>
              
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-input border-border focus:border-gold">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-input border-border focus:border-gold">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-gold text-primary-foreground" : "border-gold text-gold hover:bg-gold hover:text-primary-foreground"}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-gold text-primary-foreground" : "border-gold text-gold hover:bg-gold hover:text-primary-foreground"}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Display */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="text-gold">All Staff ({filteredStaff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStaff.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="luxury-card h-full">
                    <CardContent className="p-6 text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-4">
                        <AvatarImage src={member.avatar || undefined} alt={member.name} />
                        <AvatarFallback className="bg-gold/10 text-gold font-semibold text-lg">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                      <p className="text-gold font-medium mb-2">{member.position}</p>
                      
                      <div className="flex justify-center mb-3">
                        {getDepartmentBadge(member.department)}
                      </div>
                      
                      <div className="flex justify-center mb-3">
                        {getStatusBadge(member.status)}
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center justify-center">
                          <Mail className="w-3 h-3 mr-1" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Phone className="w-3 h-3 mr-1" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          <span>{member.salary}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        {renderStarRating(member.rating)}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 border-gold text-gold hover:bg-gold hover:text-primary-foreground">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Schedule</DropdownMenuItem>
                            <DropdownMenuItem>Payroll</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="w-3 h-3 mr-1" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredStaff.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-muted/30 rounded-lg border border-border hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar || undefined} alt={member.name} />
                        <AvatarFallback className="bg-gold/10 text-gold font-semibold">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-gold">{member.position}</p>
                          {renderStarRating(member.rating)}
                        </div>
                        
                        <div className="space-y-1">
                          {getDepartmentBadge(member.department)}
                          {getStatusBadge(member.status)}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center mb-1">
                            <Mail className="w-3 h-3 mr-1" />
                            {member.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {member.phone}
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center mb-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            Hired: {new Date(member.hireDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {member.schedule}
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex items-center mb-1">
                            <DollarSign className="w-3 h-3 mr-1 text-gold" />
                            <span className="font-medium">{member.salary}</span>
                          </div>
                          <p className="text-muted-foreground">{member.experience}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-primary-foreground">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Schedule</DropdownMenuItem>
                          <DropdownMenuItem>Payroll Info</DropdownMenuItem>
                          <DropdownMenuItem>Performance Review</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remove Staff
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No staff members found</h3>
              <p className="text-muted-foreground">
                {searchTerm || departmentFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No staff members have been added yet"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Staff Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{staff.length}</p>
              </div>
              <User className="w-8 h-8 text-gold" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Kitchen Staff</p>
                <p className="text-2xl font-bold">{staff.filter(s => s.department === 'kitchen').length}</p>
              </div>
              <ChefHat className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Service Staff</p>
                <p className="text-2xl font-bold">{staff.filter(s => s.department === 'service').length}</p>
              </div>
              <Utensils className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold">{staff.filter(s => s.status === 'active').length}</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStaff;