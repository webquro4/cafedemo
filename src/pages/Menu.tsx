import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Wheat, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/store";

const Menu = () => {
  const { items } = useSelector((state: RootState) => state.menu);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "starters", name: "Starters" },
    { id: "mains", name: "Mains" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" },
  ];

  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const formatPrice = (price: number) => `$${price}`;

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
              Our <span className="text-gold">Menu</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of dishes, crafted with the finest ingredients 
              and culinary expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-gold text-primary-foreground hover:bg-gold-dark"
                    : "border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                }
              >
                {category.name}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Items */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="luxury-card h-full">
                    <CardContent className="p-6">
                      {item.image && (
                        <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-playfair font-semibold mb-2">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              {item.isVegetarian && (
                                <div className="flex items-center text-green-500">
                                  <Leaf className="w-4 h-4" />
                                </div>
                              )}
                              {item.isGlutenFree && (
                                <div className="flex items-center text-blue-500">
                                  <Wheat className="w-4 h-4" />
                                </div>
                              )}
                              {item.isSpicy && (
                                <div className="flex items-center text-red-500">
                                  <Flame className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-2xl font-playfair font-bold text-gold ml-4">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                No items found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;