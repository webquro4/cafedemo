import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Mail, 
  Phone, 
  Clock, 
  DollarSign,
  Save,
  RefreshCw,
  Download,
  Upload,
  Palette,
  Monitor,
  Smartphone,
  Key,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Restaurant Settings State
  const [restaurantSettings, setRestaurantSettings] = useState({
    name: "Lumière Restaurant",
    tagline: "Exquisite Fine Dining Experience",
    address: "123 Fine Dining Street, New York, NY 10001",
    phone: "(555) 123-4567",
    email: "info@lumiere.com",
    website: "https://lumiere.com",
    timezone: "America/New_York",
    currency: "USD",
    taxRate: "8.25",
    serviceCharge: "18",
    openingTime: "17:00",
    closingTime: "23:00"
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newReservations: true,
    cancellations: true,
    lowInventory: true,
    staffSchedule: false,
    customerReviews: true,
    systemUpdates: false
  });

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "60",
    passwordExpiry: "90",
    loginAttempts: "5",
    ipRestriction: false,
    auditLog: true
  });

  // Integration Settings
  const [integrations, setIntegrations] = useState({
    paymentProcessor: "stripe",
    reservationSystem: "internal",
    emailService: "sendgrid",
    smsService: "twilio",
    analyticsEnabled: true,
    socialMediaSync: false
  });

  const handleSave = async (section: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings Updated",
      description: `${section} settings have been saved successfully.`,
    });
    
    setIsLoading(false);
  };

  const handleBackup = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Backup Complete",
      description: "System backup has been generated and saved.",
    });
    
    setIsLoading(false);
  };

  const handleRestore = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Restore Complete", 
      description: "System has been restored from backup.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-gold">Settings</h1>
          <p className="text-muted-foreground">Manage your restaurant settings and preferences</p>
        </div>
        <Badge variant="outline" className="border-green-500 text-green-500">
          <Check className="w-3 h-3 mr-1" />
          All Systems Online
        </Badge>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="text-gold flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Restaurant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Restaurant Name</Label>
                    <Input
                      id="restaurant-name"
                      value={restaurantSettings.name}
                      onChange={(e) => setRestaurantSettings({...restaurantSettings, name: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={restaurantSettings.tagline}
                      onChange={(e) => setRestaurantSettings({...restaurantSettings, tagline: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={restaurantSettings.address}
                    onChange={(e) => setRestaurantSettings({...restaurantSettings, address: e.target.value})}
                    className="bg-input border-border focus:border-gold"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={restaurantSettings.phone}
                        onChange={(e) => setRestaurantSettings({...restaurantSettings, phone: e.target.value})}
                        className="pl-10 bg-input border-border focus:border-gold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={restaurantSettings.email}
                        onChange={(e) => setRestaurantSettings({...restaurantSettings, email: e.target.value})}
                        className="pl-10 bg-input border-border focus:border-gold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={restaurantSettings.website}
                        onChange={(e) => setRestaurantSettings({...restaurantSettings, website: e.target.value})}
                        className="pl-10 bg-input border-border focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave("Restaurant Information")}
                  disabled={isLoading}
                  className="bg-gold text-primary-foreground hover:bg-gold-dark"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="text-gold flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Operating Hours & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={restaurantSettings.timezone} onValueChange={(value) => setRestaurantSettings({...restaurantSettings, timezone: value})}>
                      <SelectTrigger className="bg-input border-border focus:border-gold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={restaurantSettings.currency} onValueChange={(value) => setRestaurantSettings({...restaurantSettings, currency: value})}>
                      <SelectTrigger className="bg-input border-border focus:border-gold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tax Rate (%)</Label>
                    <Input
                      value={restaurantSettings.taxRate}
                      onChange={(e) => setRestaurantSettings({...restaurantSettings, taxRate: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Service Charge (%)</Label>
                    <Input
                      value={restaurantSettings.serviceCharge}
                      onChange={(e) => setRestaurantSettings({...restaurantSettings, serviceCharge: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Opening Time</Label>
                    <Input
                      type="time"
                      value={restaurantSettings.openingTime}
                      onChange={(e) => setRestaurantSettings({...restaurantSettings, openingTime: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Closing Time</Label>
                    <Input
                      type="time"
                      value={restaurantSettings.closingTime}
                      onChange={(e) => setRestaurantSettings({...restaurantSettings, closingTime: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave("Operating Settings")}
                  disabled={isLoading}
                  className="bg-gold text-primary-foreground hover:bg-gold-dark"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Delivery Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gold" />
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-gold" />
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Event Types</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'newReservations', label: 'New Reservations', desc: 'When new reservations are made' },
                      { key: 'cancellations', label: 'Cancellations', desc: 'When reservations are cancelled' },
                      { key: 'lowInventory', label: 'Low Inventory', desc: 'When inventory levels are low' },
                      { key: 'staffSchedule', label: 'Staff Schedule', desc: 'Staff scheduling updates' },
                      { key: 'customerReviews', label: 'Customer Reviews', desc: 'New customer reviews' },
                      { key: 'systemUpdates', label: 'System Updates', desc: 'System maintenance and updates' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <Label>{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications] as boolean}
                          onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleSave("Notification")}
                disabled={isLoading}
                className="bg-gold text-primary-foreground hover:bg-gold-dark"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="grid gap-6">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="text-gold flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Key className="w-5 h-5 text-gold" />
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                      </div>
                    </div>
                    <Switch
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-gold" />
                      <div>
                        <Label>IP Restriction</Label>
                        <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                      </div>
                    </div>
                    <Switch
                      checked={security.ipRestriction}
                      onCheckedChange={(checked) => setSecurity({...security, ipRestriction: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-gold" />
                      <div>
                        <Label>Audit Log</Label>
                        <p className="text-sm text-muted-foreground">Keep detailed logs of all system activities</p>
                      </div>
                    </div>
                    <Switch
                      checked={security.auditLog}
                      onCheckedChange={(checked) => setSecurity({...security, auditLog: checked})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password Expiry (days)</Label>
                    <Input
                      value={security.passwordExpiry}
                      onChange={(e) => setSecurity({...security, passwordExpiry: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Login Attempts</Label>
                    <Input
                      value={security.loginAttempts}
                      onChange={(e) => setSecurity({...security, loginAttempts: e.target.value})}
                      className="bg-input border-border focus:border-gold"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave("Security")}
                  disabled={isLoading}
                  className="bg-gold text-primary-foreground hover:bg-gold-dark"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="text-gold flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="bg-input border-border focus:border-gold pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="bg-input border-border focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-input border-border focus:border-gold"
                  />
                </div>
                <Button className="bg-gold text-primary-foreground hover:bg-gold-dark">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-gold">System Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Payment Processor</Label>
                  <Select value={integrations.paymentProcessor} onValueChange={(value) => setIntegrations({...integrations, paymentProcessor: value})}>
                    <SelectTrigger className="bg-input border-border focus:border-gold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Email Service</Label>
                  <Select value={integrations.emailService} onValueChange={(value) => setIntegrations({...integrations, emailService: value})}>
                    <SelectTrigger className="bg-input border-border focus:border-gold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="aws-ses">AWS SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">Enable Google Analytics integration</p>
                  </div>
                  <Switch
                    checked={integrations.analyticsEnabled}
                    onCheckedChange={(checked) => setIntegrations({...integrations, analyticsEnabled: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Social Media Sync</Label>
                    <p className="text-sm text-muted-foreground">Automatically sync with social media platforms</p>
                  </div>
                  <Switch
                    checked={integrations.socialMediaSync}
                    onCheckedChange={(checked) => setIntegrations({...integrations, socialMediaSync: checked})}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSave("Integration")}
                disabled={isLoading}
                className="bg-gold text-primary-foreground hover:bg-gold-dark"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup */}
        <TabsContent value="backup">
          <div className="grid gap-6">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="text-gold flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  System Backup & Restore
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Create Backup</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a complete backup of your restaurant data including menus, reservations, and settings.
                    </p>
                    <Button 
                      onClick={handleBackup}
                      disabled={isLoading}
                      className="w-full bg-gold text-primary-foreground hover:bg-gold-dark"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isLoading ? "Creating Backup..." : "Create Backup"}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Restore from Backup</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload and restore from a previous backup file. This will overwrite current data.
                    </p>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept=".backup"
                        className="bg-input border-border focus:border-gold"
                      />
                      <Button 
                        onClick={handleRestore}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {isLoading ? "Restoring..." : "Restore Backup"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-500">Important Notice</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Always create a backup before making major changes. Restore operations cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="text-gold">Backup History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "2024-01-20 14:30", size: "125 MB", type: "Full Backup" },
                    { date: "2024-01-19 10:15", size: "98 MB", type: "Scheduled Backup" },
                    { date: "2024-01-18 16:45", size: "134 MB", type: "Manual Backup" }
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{backup.type}</p>
                        <p className="text-sm text-muted-foreground">{backup.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{backup.size}</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced */}
        <TabsContent value="advanced">
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Advanced System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-500">Advanced Settings</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      These settings can affect system performance and functionality. Only modify if you understand the implications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed logging for troubleshooting</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cache System</Label>
                    <p className="text-sm text-muted-foreground">Enable caching for better performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Cache
                </Button>
                <Button 
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Reset All Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;