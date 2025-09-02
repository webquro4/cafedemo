import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, Star, Users, Award, Quote, ChefHat, Sparkles, Crown, Heart, Utensils } from "lucide-react";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { openReservationModal } from "@/store/slices/reservationSlice";
import heroImage from "@/assets/hero-restaurant.jpg";

const Index = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.items);

  const handleReservation = () => {
    dispatch(openReservationModal());
  };

  // Get a few featured menu items for preview
  const featuredMenuItems = menuItems.slice(0, 4);

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

  const reviews = [
    {
      name: "Victoria Ashford",
      role: "Food Critic, NY Times",
      rating: 5,
      comment: "An extraordinary culinary journey that redefines fine dining. Every dish is a masterpiece that tells a story.",
      avatar: null
    },
    {
      name: "James Wellington",
      role: "CEO, Wellington Group", 
      rating: 5,
      comment: "Lumière has become our go-to for client dinners. The ambiance and service are simply unmatched.",
      avatar: null
    },
    {
      name: "Sofia Martinez",
      role: "Celebrity Chef",
      rating: 5, 
      comment: "Chef Dubois has created something truly special here. The attention to detail is phenomenal.",
      avatar: null
    }
  ];

  const chefs = [
    {
      name: "Chef Marcus Dubois",
      title: "Executive Chef & Owner",
      specialty: "French Molecular Gastronomy", 
      awards: "3 Michelin Stars, James Beard Winner",
      description: "With over 25 years of culinary mastery, Chef Dubois brings innovation to classical French techniques.",
      image: null
    },
    {
      name: "Chef Isabella Romano",
      title: "Pastry Chef",
      specialty: "Artisan Desserts",
      awards: "World Pastry Champion 2023",
      description: "Creates edible art that perfectly balances flavor, texture, and visual stunning presentation.",
      image: null
    }
  ];

  const upcomingEvents = [
    {
      title: "Wine Pairing Dinner",
      date: "February 14th",
      time: "7:00 PM",
      description: "5-course tasting menu paired with rare French wines from our private collection.",
      price: "$195",
      limited: true
    },
    {
      title: "Chef's Table Experience", 
      date: "February 21st",
      time: "6:30 PM",
      description: "Interactive dining experience with Chef Dubois showcasing seasonal ingredients.",
      price: "$275",
      limited: true
    },
    {
      title: "Truffle Season Menu",
      date: "March 1st - 31st",
      time: "Daily",
      description: "Limited-time menu featuring the finest black and white truffles from Périgord.",
      price: "À la carte",
      limited: false
    }
  ];

  const celebrities = [
    {
      name: "Robert De Niro",
      occasion: "Private Birthday Celebration",
      quote: "The most memorable dining experience I've had in years.",
      date: "January 2024"
    },
    {
      name: "Emma Stone", 
      occasion: "Post-Premiere Dinner",
      quote: "Absolutely divine. The chocolate soufflé was pure magic!",
      date: "December 2023"
    },
    {
      name: "Gordon Ramsay",
      occasion: "Chef's Personal Visit",
      quote: "Marcus has truly created something extraordinary here. Brilliant!",
      date: "November 2023"
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

      {/* Menu Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Our <span className="text-gold">Signature</span> Menu
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our carefully crafted dishes that blend innovation with tradition, 
              using only the finest ingredients from around the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredMenuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="luxury-card h-full overflow-hidden">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <Utensils className="w-12 h-12 text-gold/50" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair font-semibold text-lg leading-tight">{item.name}</h3>
                      <span className="text-gold font-bold text-lg">${item.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      {item.isVegetarian && (
                        <span className="w-6 h-6 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center text-xs">
                          V
                        </span>
                      )}
                      {item.isGlutenFree && (
                        <span className="w-6 h-6 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-xs">
                          GF
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="w-6 h-6 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-xs">
                          🌶️
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="btn-gold text-lg px-8 py-4"
            >
              <Link to="/menu">
                <Utensils className="w-5 h-5 mr-2" />
                See Full Menu
              </Link>
            </Button>
          </motion.div>
        </div>
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

      {/* Reviews Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              What Our <span className="text-gold">Guests</span> Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover why Lumière has earned acclaim from food critics, celebrities, and discerning diners worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="luxury-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-gold mb-4" />
                    <p className="text-muted-foreground mb-6 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 mr-4">
                        <AvatarFallback className="bg-gold/10 text-gold font-semibold">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Meet Our <span className="text-gold">Culinary</span> Masters
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              World-renowned chefs who transform the finest ingredients into extraordinary culinary experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {chefs.map((chef, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 }}
              >
                <Card className="luxury-card">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                      <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <ChefHat className="w-16 h-16 text-gold" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-playfair font-bold mb-2">{chef.name}</h3>
                        <p className="text-gold font-semibold mb-1">{chef.title}</p>
                        <p className="text-sm text-muted-foreground mb-3">{chef.specialty}</p>
                        <div className="flex items-center justify-center md:justify-start mb-4">
                          <Award className="w-4 h-4 text-gold mr-2" />
                          <span className="text-sm font-medium">{chef.awards}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{chef.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gradient-to-r from-gold/5 to-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Exclusive <span className="text-gold">Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join us for special culinary events, wine tastings, and unique dining experiences throughout the year.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="luxury-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Sparkles className="w-8 h-8 text-gold" />
                      {event.limited && (
                        <span className="bg-red-500/10 text-red-500 text-xs px-2 py-1 rounded-full border border-red-500/20">
                          Limited Seats
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-playfair font-bold mb-3">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-gold" />
                        {event.date} at {event.time}
                      </div>
                      <div className="text-2xl font-bold text-gold">{event.price}</div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {event.description}
                    </p>
                    <Button 
                      className="w-full bg-gold text-primary-foreground hover:bg-gold-dark"
                      onClick={handleReservation}
                    >
                      Reserve Spot
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrity Endorsements */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              <span className="text-gold">Celebrity</span> Visits
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Lumière has been honored to host some of the world's most distinguished personalities and celebrities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {celebrities.map((celebrity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="luxury-card text-center">
                  <CardContent className="p-6">
                    <Crown className="w-12 h-12 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-playfair font-bold mb-2">{celebrity.name}</h3>
                    <p className="text-sm text-gold mb-4">{celebrity.occasion}</p>
                    <Quote className="w-6 h-6 text-gold/50 mx-auto mb-3" />
                    <p className="text-muted-foreground italic mb-4 leading-relaxed">
                      "{celebrity.quote}"
                    </p>
                    <p className="text-xs text-muted-foreground">{celebrity.date}</p>
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
            <div className="flex justify-center mb-6">
              <Heart className="w-16 h-16 text-gold" />
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold">
              Ready for an Unforgettable Evening?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our prestigious list of satisfied guests and experience culinary excellence that has earned worldwide acclaim.
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