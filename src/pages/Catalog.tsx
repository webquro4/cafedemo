import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "dishes", name: "Signature Dishes" },
    { id: "ambiance", name: "Restaurant" },
    { id: "events", name: "Events" },
  ];

  // Mock catalog images
  const images = [
    { id: 1, category: "dishes", title: "Wagyu Beef Tartare", description: "Hand-cut wagyu with quail egg and caviar" },
    { id: 2, category: "ambiance", title: "Dining Room", description: "Elegant interior with warm lighting" },
    { id: 3, category: "dishes", title: "Truffle Arancini", description: "Crispy risotto balls with black truffle" },
    { id: 4, category: "events", title: "Private Dining", description: "Exclusive dining experience" },
    { id: 5, category: "dishes", title: "Pan-Seared Halibut", description: "Atlantic halibut with cauliflower purée" },
    { id: 6, category: "ambiance", title: "Wine Cellar", description: "Curated selection of fine wines" },
    { id: 7, category: "dishes", title: "Chocolate Soufflé", description: "Warm chocolate soufflé with gold leaf" },
    { id: 8, category: "events", title: "Chef's Table", description: "Interactive culinary experience" },
    { id: 9, category: "ambiance", title: "Bar Area", description: "Sophisticated cocktail lounge" },
  ];

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") setSelectedImage(null);
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
              Our <span className="text-gold">Catalog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of signature dishes, elegant spaces, 
              and memorable dining experiences.
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

      {/* Catalog Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group relative"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gold/20 to-background flex items-center justify-center">
                    <p className="text-gold font-playfair text-center p-4">{image.title}</p>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-playfair font-semibold mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-300">{image.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 text-white hover:text-gold hover:bg-black/50"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gold hover:bg-black/50"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gold hover:bg-black/50"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>

              {/* Image */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gold/20 to-background flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gold font-playfair text-3xl mb-2">
                      {filteredImages[selectedImage]?.title}
                    </p>
                    <p className="text-white/80">
                      {filteredImages[selectedImage]?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Counter */}
              <div className="text-center mt-4 text-white/70">
                {selectedImage + 1} / {filteredImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;