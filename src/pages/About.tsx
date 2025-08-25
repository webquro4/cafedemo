import { motion } from "framer-motion";
import { Award, Users, Clock, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every dish, every service interaction, and every moment of your dining experience."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for culinary arts drives us to constantly innovate and create memorable flavors and presentations."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in bringing people together around exceptional food, creating connections that last beyond the meal."
    },
    {
      icon: Clock,
      title: "Tradition",
      description: "Honoring classic techniques while embracing modern innovation to create timeless culinary experiences."
    }
  ];

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
              Our <span className="text-gold">Story</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A journey of culinary excellence, passion, and dedication to creating 
              unforgettable dining experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-playfair font-bold">
                Founded on <span className="text-gold">Excellence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Lumière was born from a simple yet profound vision: to create a dining experience 
                  that transcends the ordinary and touches the soul. Our journey began over two decades 
                  ago when Chef Marcus Dubois, a Michelin-starred visionary, decided to bring his 
                  passion for French culinary artistry to the heart of New York City.
                </p>
                <p>
                  What started as a dream in a small Parisian bistro has evolved into one of the city's 
                  most celebrated fine dining destinations. Every element of Lumière reflects our 
                  commitment to excellence, from the carefully sourced ingredients to the impeccable 
                  service that has become our signature.
                </p>
                <p>
                  Today, we continue to honor the traditions that built our foundation while embracing 
                  innovation that keeps us at the forefront of culinary excellence. Each dish tells a 
                  story, each evening creates memories, and each guest becomes part of our extended family.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gold/20 to-background flex items-center justify-center">
                  <p className="text-gold font-playfair text-2xl">Chef Portrait</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Our <span className="text-gold">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every decision, every dish, and every moment 
              of your experience at Lumière.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
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
                      <value.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Meet Our <span className="text-gold">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate individuals who bring Lumière to life every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Chef Marcus Dubois", role: "Executive Chef", description: "Michelin-starred chef with 20+ years of culinary excellence" },
              { name: "Sarah Chen", role: "Sommelier", description: "Award-winning sommelier curating our exceptional wine program" },
              { name: "James Morrison", role: "General Manager", description: "Hospitality expert ensuring every guest feels truly welcomed" }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="luxury-card">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gold/20 to-background flex items-center justify-center">
                        <p className="text-gold font-playfair">{member.name.split(' ')[0]}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-playfair font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gold mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;