import { useState, useEffect } from "react";
import { X, Upload, DollarSign, Calendar, Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: 'kitchen' | 'service' | 'management';
  email: string;
  phone: string;
  address: string;
  salary: string;
  hireDate: string;
  schedule: string;
  status: 'active' | 'on_leave' | 'inactive';
  avatar?: string;
  skills: string[];
  rating: number;
  experience: string;
}

interface StaffMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: StaffMember) => void;
  member?: StaffMember | null;
}

const StaffMemberModal = ({ isOpen, onClose, onSave, member }: StaffMemberModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "service" as StaffMember['department'],
    email: "",
    phone: "",
    address: "",
    salary: "",
    hireDate: "",
    schedule: "",
    status: "active" as StaffMember['status'],
    avatar: "",
    skills: [] as string[],
    rating: 5,
    experience: "",
  });

  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        position: member.position,
        department: member.department,
        email: member.email,
        phone: member.phone,
        address: member.address,
        salary: member.salary,
        hireDate: member.hireDate,
        schedule: member.schedule,
        status: member.status,
        avatar: member.avatar || "",
        skills: member.skills || [],
        rating: member.rating,
        experience: member.experience,
      });
    } else {
      setFormData({
        name: "",
        position: "",
        department: "service",
        email: "",
        phone: "",
        address: "",
        salary: "",
        hireDate: "",
        schedule: "",
        status: "active",
        avatar: "",
        skills: [],
        rating: 5,
        experience: "",
      });
    }
    setSkillInput("");
  }, [member, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.position || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const staffMember: StaffMember = {
        id: member?.id || Date.now().toString(),
        name: formData.name,
        position: formData.position,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        salary: formData.salary,
        hireDate: formData.hireDate,
        schedule: formData.schedule,
        status: formData.status,
        avatar: formData.avatar || undefined,
        skills: formData.skills,
        rating: formData.rating,
        experience: formData.experience,
      };

      onSave(staffMember);
      
      toast({
        title: "Success",
        description: member ? "Staff member updated successfully" : "Staff member added successfully",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save staff member",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const departments = [
    { value: "kitchen", label: "Kitchen" },
    { value: "service", label: "Service" },
    { value: "management", label: "Management" }
  ];

  const statuses = [
    { value: "active", label: "Active" },
    { value: "on_leave", label: "On Leave" },
    { value: "inactive", label: "Inactive" }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const renderStarRating = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star 
              className={`w-5 h-5 ${star <= rating ? 'fill-gold text-gold' : 'text-muted-foreground'} hover:text-gold transition-colors`} 
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({rating}/5)</span>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-gold">
            {member ? "Edit Staff Member" : "Add New Staff Member"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback className="bg-gold/10 text-gold font-semibold text-xl">
                  {formData.name ? getInitials(formData.name) : "??"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 w-full">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-input border-border focus:border-gold w-48"
                />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="bg-input border-border focus:border-gold"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Enter job position"
                  className="bg-input border-border focus:border-gold"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value as StaffMember['department'] })}>
                  <SelectTrigger className="bg-input border-border focus:border-gold">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as StaffMember['status'] })}>
                  <SelectTrigger className="bg-input border-border focus:border-gold">
                    <SelectValue placeholder="Select status" />
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
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                className="bg-input border-border focus:border-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
                className="bg-input border-border focus:border-gold"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter home address"
              className="bg-input border-border focus:border-gold"
            />
          </div>

          {/* Employment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="$50,000"
                  className="pl-10 bg-input border-border focus:border-gold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                  className="pl-10 bg-input border-border focus:border-gold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="5+ years"
                className="bg-input border-border focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="Mon-Fri 9AM-5PM"
                className="pl-10 bg-input border-border focus:border-gold"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Performance Rating</Label>
            {renderStarRating(formData.rating, (rating) => setFormData({ ...formData, rating }))}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <Label>Skills & Expertise</Label>
            <div className="flex space-x-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill..."
                className="bg-input border-border focus:border-gold"
              />
              <Button type="button" onClick={addSkill} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-gold/10 text-gold">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-gold/70 hover:text-gold"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gold text-primary-foreground hover:bg-gold-dark"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : member ? "Update Staff Member" : "Add Staff Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StaffMemberModal;