import { motion } from "framer-motion";
import { Calendar, Users, DollarSign, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Today's Reservations",
      value: "24",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      title: "Total Guests",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "text-green-500"
    },
    {
      title: "Weekly Revenue",
      value: "$18,420",
      change: "+23%",
      icon: DollarSign,
      color: "text-gold"
    },
    {
      title: "Average Rating",
      value: "4.9",
      change: "+0.1",
      icon: TrendingUp,
      color: "text-purple-500"
    }
  ];

  const recentReservations = [
    { id: 1, name: "John Smith", time: "7:30 PM", guests: 4, status: "confirmed" },
    { id: 2, name: "Sarah Johnson", time: "8:00 PM", guests: 2, status: "pending" },
    { id: 3, name: "Mike Wilson", time: "8:30 PM", guests: 6, status: "confirmed" },
    { id: 4, name: "Emily Davis", time: "9:00 PM", guests: 2, status: "cancelled" },
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-gold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="luxury-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-500">{stat.change} from last week</p>
                  </div>
                  <div className={`p-3 bg-muted rounded-full ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-gold">Recent Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(reservation.status)}
                    <div>
                      <p className="font-medium">{reservation.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.guests} guests at {reservation.time}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    reservation.status === 'confirmed' 
                      ? 'bg-green-500/10 text-green-500'
                      : reservation.status === 'pending'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {reservation.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-gold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Add Menu Item</div>
                <div className="text-sm text-muted-foreground">Create a new dish for the menu</div>
              </button>
              <button className="w-full p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">View Today's Schedule</div>
                <div className="text-sm text-muted-foreground">Check all reservations for today</div>
              </button>
              <button className="w-full p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Update Gallery</div>
                <div className="text-sm text-muted-foreground">Add new photos to the gallery</div>
              </button>
              <button className="w-full p-3 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-muted-foreground">Download weekly analytics</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;