import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { openReservationModal } from "@/store/slices/reservationSlice";
import heroImage from "@/assets/hero-restaurant.jpg";

const Index = () => {
  const dispatch = useDispatch();

  const handleReservation = () => {
    dispatch(openReservationModal());
  };

  const features = [
    {
      icon: Award,
      title: "Award Winning",
      description: "Michelin starred chef with 20+ years of culinary excellence"
    },
    {
      icon: Users,
      title: "Private Events",
      description: "Exclusive dining experiences for special occasions"
    },
    {
      icon: Star,
      title: "Premium Service",
      description: "White-glove service with attention to every detail"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white leading-tight">
              Exquisite
              <span className="block text-gold">Culinary</span>
              Experience
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Where artistry meets flavor in an unforgettable fine dining journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                onClick={handleReservation}
                size="lg"
                className="btn-gold text-lg px-8 py-4"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Reserve Your Table
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                asChild
                className="btn-outline-gold text-lg px-8 py-4"
              >
                <Link to="/menu">View Menu</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Why Choose <span className="text-gold">Lumière</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the pinnacle of fine dining with our commitment to excellence, 
              innovative cuisine, and unparalleled hospitality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="luxury-card text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-2xl font-playfair font-semibold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold/10 to-gold/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold">
              Ready for an Unforgettable Evening?
            </h2>
            <p className="text-xl text-muted-foreground">
              Book your table now and let us create memories that will last a lifetime.
            </p>
            <Button
              onClick={handleReservation}
              size="lg"
              className="btn-gold text-lg px-12 py-4"
            >
              Make a Reservation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;