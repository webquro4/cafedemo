import { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Award, Star, Calendar, MapPin, Clock, Users, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Chefs = () => {
  const [selectedChef, setSelectedChef] = useState<number | null>(null);

  const chefs = [
    {
      id: 1,
      name: "Chef Marcus Dubois",
      title: "Executive Chef & Owner",
      specialty: "French Molecular Gastronomy",
      experience: "25+ Years",
      awards: ["3 Michelin Stars", "James Beard Award Winner", "Chef of the Year 2023"],
      education: "Le Cordon Bleu Paris, Institut Paul Bocuse",
      philosophy: "Cooking is not just about feeding the body, but nourishing the soul. Every dish should tell a story and create an emotional connection.",
      signature: ["Deconstructed Bouillabaisse", "Truffle Soufflé", "Molecular Chocolate Sphere"],
      bio: "Born in Lyon, France, Chef Marcus Dubois discovered his passion for cooking at age 12 in his grandmother's kitchen. After training at the world's most prestigious culinary institutions, he worked under legendary chefs including Joël Robuchon and Alain Ducasse. His innovative approach to French cuisine has earned him international acclaim and numerous awards.",
      achievements: [
        "Youngest chef to earn 3 Michelin stars at age 32",
        "Featured in Top Chef Masters as mentor",
        "Author of 'The Art of Modern French Cuisine'",
        "Founded Lumière Culinary Institute"
      ],
      personalTouch: "When not in the kitchen, Chef Dubois enjoys wine collecting and teaching young chefs. He believes in sustainable cooking and sources ingredients from local organic farms.",
      image: null
    },
    {
      id: 2,
      name: "Chef Isabella Romano",
      title: "Executive Pastry Chef",
      specialty: "Artisan Desserts & Sugar Art",
      experience: "15+ Years",
      awards: ["World Pastry Champion 2023", "Best Dessert Chef NYC", "Sugar Art Master"],
      education: "Pastry Arts Institute, Le Nôtre Paris",
      philosophy: "Desserts are the final note in a culinary symphony. They should leave guests with a lasting memory of sweetness and wonder.",
      signature: ["Gold Leaf Chocolate Soufflé", "Rose Petal Macarons", "Crystallized Sugar Sculptures"],
      bio: "Chef Isabella Romano's journey began in her family's bakery in Sicily. Her artistic background in sculpture perfectly complements her pastry skills, creating desserts that are as visually stunning as they are delicious. She joined Lumière five years ago and has revolutionized our dessert program.",
      achievements: [
        "Created desserts for celebrities including Oprah Winfrey",
        "Featured on Netflix's 'The World's Most Amazing Desserts'",
        "Teaches masterclasses at culinary schools worldwide",
        "Her cookbook 'Sweet Artistry' became a bestseller"
      ],
      personalTouch: "Isabella is passionate about teaching and mentors young pastry chefs. She also creates custom wedding cakes for high-profile clients and enjoys painting in her free time.",
      image: null
    },
    {
      id: 3,
      name: "Chef Antonio Rodriguez",
      title: "Sous Chef",
      specialty: "Mediterranean Fusion",
      experience: "12+ Years",
      awards: ["Rising Star Chef 2022", "Innovation in Cuisine Award"],
      education: "Culinary Institute of America, Basque Culinary Center",
      philosophy: "The Mediterranean diet is not just about ingredients, it's about bringing people together and celebrating life through food.",
      signature: ["Saffron Paella Risotto", "Iberico Ham Croquettes", "Sea Bass Crudo"],
      bio: "Born in Barcelona, Chef Antonio brings the vibrant flavors of the Mediterranean to Lumière. His innovative fusion techniques combine traditional Spanish cooking with modern French methods, creating unique dishes that surprise and delight.",
      achievements: [
        "Opened his own restaurant in Barcelona at age 26",
        "Consultant for Mediterranean restaurants worldwide",
        "Regular guest on Spanish cooking shows",
        "Awarded 'Best Young Chef' by Spanish Culinary Association"
      ],
      personalTouch: "Antonio is fluent in five languages and loves to interact with international guests. He's also an avid surfer and incorporates fresh seafood from his surfing trips into seasonal menus.",
      image: null
    },
    {
      id: 4,
      name: "Chef Yuki Tanaka",
      title: "Sushi Master",
      specialty: "Japanese Omakase",
      experience: "20+ Years",
      awards: ["Master Sushi Chef Certification", "Best Omakase Experience NYC"],
      education: "Tokyo Sushi Academy, Traditional Apprenticeship in Japan",
      philosophy: "Sushi is the purest form of culinary art. It requires patience, precision, and deep respect for the ingredients and traditions.",
      signature: ["Toro Tasting Flight", "Uni Tempura", "Chef's Omakase Selection"],
      bio: "Chef Yuki trained for 15 years in Tokyo under sushi masters before bringing his expertise to New York. His omakase experience at Lumière is considered one of the finest outside of Japan, featuring the freshest fish flown in daily from Tsukiji Market.",
      achievements: [
        "Only non-Japanese chef to receive Master certification from Tokyo Guild",
        "Maintains relationships with Tokyo's top fish suppliers",
        "Featured in documentary 'The Art of Sushi'",
        "Trains other chefs in traditional Japanese techniques"
      ],
      personalTouch: "Yuki practices meditation daily and believes it brings focus to his knife work. He also grows his own wasabi and maintains a traditional Japanese garden.",
      image: null
    }
  ];

  const getChefInitials = (name: string) => {
    return name.split(' ').slice(1).map(n => n[0]).join('');
  };

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
              Our <span className="text-gold">Culinary</span> Masters
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the exceptional chefs who bring passion, creativity, and world-class expertise 
              to every dish at Lumière.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chefs Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {chefs.map((chef, index) => (
              <motion.div
                key={chef.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer"
                onClick={() => setSelectedChef(selectedChef === chef.id ? null : chef.id)}
              >
                <Card className={`luxury-card transition-all duration-300 ${
                  selectedChef === chef.id ? 'ring-2 ring-gold border-gold' : ''
                }`}>
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={chef.image || undefined} alt={chef.name} />
                      <AvatarFallback className="bg-gold/10 text-gold text-lg font-bold">
                        {getChefInitials(chef.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-xl font-playfair font-bold mb-2">{chef.name}</h3>
                    <p className="text-gold font-semibold mb-1">{chef.title}</p>
                    <p className="text-sm text-muted-foreground mb-3">{chef.specialty}</p>
                    
                    <div className="flex items-center justify-center mb-4">
                      <Clock className="w-4 h-4 text-gold mr-2" />
                      <span className="text-sm">{chef.experience}</span>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {chef.awards.slice(0, 2).map((award, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-gold text-gold">
                          <Award className="w-3 h-3 mr-1" />
                          {award.length > 20 ? award.substring(0, 20) + '...' : award}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                    >
                      {selectedChef === chef.id ? 'Hide Details' : 'View Details'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Details */}
      {selectedChef && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pb-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {chefs
              .filter(chef => chef.id === selectedChef)
              .map((chef) => (
                <Card key={chef.id} className="luxury-card">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Column - Image and Basic Info */}
                      <div className="space-y-6">
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
                          <ChefHat className="w-24 h-24 text-gold" />
                        </div>
                        
                        <div className="text-center">
                          <h2 className="text-3xl font-playfair font-bold mb-2">{chef.name}</h2>
                          <p className="text-xl text-gold font-semibold mb-1">{chef.title}</p>
                          <p className="text-muted-foreground">{chef.specialty}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-gold mr-3" />
                            <span>{chef.experience} Experience</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-gold mr-3" />
                            <span>{chef.education}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Middle Column - Bio and Philosophy */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-playfair font-bold mb-3 text-gold">Philosophy</h3>
                          <div className="relative">
                            <Quote className="w-6 h-6 text-gold/50 mb-2" />
                            <p className="text-muted-foreground italic leading-relaxed pl-2">
                              "{chef.philosophy}"
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-playfair font-bold mb-3 text-gold">Biography</h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {chef.bio}
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            {chef.personalTouch}
                          </p>
                        </div>
                      </div>
                      
                      {/* Right Column - Awards and Signature Dishes */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-playfair font-bold mb-3 text-gold">Awards & Recognition</h3>
                          <div className="space-y-2">
                            {chef.awards.map((award, i) => (
                              <div key={i} className="flex items-center">
                                <Star className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                                <span className="text-sm">{award}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-playfair font-bold mb-3 text-gold">Signature Dishes</h3>
                          <div className="space-y-2">
                            {chef.signature.map((dish, i) => (
                              <div key={i} className="flex items-center">
                                <ChefHat className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                                <span className="text-sm">{dish}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-playfair font-bold mb-3 text-gold">Achievements</h3>
                          <div className="space-y-2">
                            {chef.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-start">
                                <Award className="w-4 h-4 text-gold mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm leading-relaxed">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </motion.section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gold/5 to-gold/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              Experience <span className="text-gold">Culinary Artistry</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Book your table and let our world-class chefs create an unforgettable dining experience for you.
            </p>
            <Button size="lg" className="bg-gold text-primary-foreground hover:bg-gold-dark px-8 py-3">
              <Calendar className="w-5 h-5 mr-2" />
              Make a Reservation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Chefs;