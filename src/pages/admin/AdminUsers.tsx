import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, Shield, User, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserModal from "@/components/admin/UserModal";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar?: string | null;
  lastLogin: string;
  status: "active" | "inactive" | "suspended";
  joinedDate: string;
}

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Marcus Dubois",
      email: "marcus@lumiere.com",
      role: "admin",
      avatar: null,
      lastLogin: "2024-01-20T10:30:00Z",
      status: "active",
      joinedDate: "2023-01-15"
    },
    {
      id: "2", 
      name: "Sarah Chen",
      email: "sarah@lumiere.com",
      role: "editor",
      avatar: null,
      lastLogin: "2024-01-19T15:45:00Z",
      status: "active",
      joinedDate: "2023-03-20"
    },
    {
      id: "3",
      name: "James Morrison",
      email: "james@lumiere.com",
      role: "editor",
      avatar: null,
      lastLogin: "2024-01-18T09:15:00Z",
      status: "active",
      joinedDate: "2023-06-10"
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma@lumiere.com",
      role: "editor",
      avatar: null,
      lastLogin: "2024-01-10T14:20:00Z",
      status: "inactive",
      joinedDate: "2023-09-05"
    }
  ]);
  const { toast } = useToast();

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been successfully deleted.",
    });
  };

  const handleSaveUser = (userData: Omit<User, "id" | "lastLogin" | "joinedDate"> & { id?: string }) => {
    if (userData.id) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === userData.id 
          ? { 
              ...user, 
              ...userData,
              avatar: userData.avatar || null
            } as User
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        avatar: userData.avatar || null,
        lastLogin: new Date().toISOString(),
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-red-500/10 text-red-500 border-red-500/20",
      editor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      viewer: "bg-gray-500/10 text-gray-500 border-gray-500/20"
    };

    return (
      <Badge className={variants[role as keyof typeof variants] || variants.viewer}>
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-500/10 text-green-500 border-green-500/20",
      inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
      suspended: "bg-red-500/10 text-red-500 border-red-500/20"
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.inactive}>
        {status}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-gold">User Management</h1>
          <p className="text-muted-foreground">Manage admin users and their permissions</p>
        </div>
        <Button 
          onClick={handleAddUser}
          className="bg-gold text-primary-foreground hover:bg-gold-dark"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <Card className="luxury-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border focus:border-gold"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="text-gold">All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-muted/30 rounded-lg border border-border hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar || undefined} alt={user.name} />
                      <AvatarFallback className="bg-gold/10 text-gold font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Joined {formatDate(user.joinedDate)}
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Last login: {new Date(user.lastLogin).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="w-4 h-4 mr-2" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? "Try adjusting your search criteria"
                    : "No users have been added yet"
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Roles Info */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="text-gold">User Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20">admin</Badge>
              <div>
                <p className="font-medium">Administrator</p>
                <p className="text-sm text-muted-foreground">
                  Full access to all features including user management, system settings, and content management.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">editor</Badge>
              <div>
                <p className="font-medium">Editor</p>
                <p className="text-sm text-muted-foreground">
                  Can manage content, reservations, and menu items. Cannot access user management or system settings.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">viewer</Badge>
              <div>
                <p className="font-medium">Viewer</p>
                <p className="text-sm text-muted-foreground">
                  Read-only access to view reports and analytics. Cannot make changes to any content.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  );
};

export default AdminUsers;