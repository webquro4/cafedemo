import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Image, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const menuItems = [
    {
      id: "1",
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle, parmesan, and wild mushroom ragù",
      price: 18,
      category: "starters",
      image: null,
      isVegetarian: true,
      isGlutenFree: false,
      isSpicy: false,
      available: true
    },
    {
      id: "2",
      name: "Wagyu Beef Tartare",
      description: "Hand-cut wagyu beef with quail egg, caviar, and crispy shallots",
      price: 32,
      category: "starters",
      image: null,
      isVegetarian: false,
      isGlutenFree: true,
      isSpicy: false,
      available: true
    },
    {
      id: "3",
      name: "Pan-Seared Halibut",
      description: "Atlantic halibut with cauliflower purée, brown butter, and microgreens",
      price: 45,
      category: "mains",
      image: null,
      isVegetarian: false,
      isGlutenFree: true,
      isSpicy: false,
      available: false
    },
    {
      id: "4",
      name: "Dry-Aged Ribeye",
      description: "28-day aged ribeye with roasted bone marrow and truffle jus",
      price: 65,
      category: "mains",
      image: null,
      isVegetarian: false,
      isGlutenFree: true,
      isSpicy: false,
      available: true
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "starters", label: "Starters" },
    { value: "mains", label: "Mains" },
    { value: "desserts", label: "Desserts" },
    { value: "drinks", label: "Drinks" }
  ];

  const getCategoryBadge = (category: string) => {
    const colors = {
      starters: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      mains: "bg-red-500/10 text-red-500 border-red-500/20",
      desserts: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      drinks: "bg-green-500/10 text-green-500 border-green-500/20"
    };

    return (
      <Badge className={colors[category as keyof typeof colors] || "bg-gray-500/10 text-gray-500"}>
        {category}
      </Badge>
    );
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-gold">Menu Management</h1>
          <p className="text-muted-foreground">Create and manage your restaurant menu items</p>
        </div>
        <Button className="bg-gold text-primary-foreground hover:bg-gold-dark">
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Filters */}
      <Card className="luxury-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border focus:border-gold"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 bg-input border-border focus:border-gold">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="luxury-card h-full">
              <CardContent className="p-6">
                {/* Image Placeholder */}
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-center">
                      <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No Image</p>
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-playfair font-semibold text-lg leading-tight">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getCategoryBadge(item.category)}
                        {!item.available && (
                          <Badge variant="secondary" className="bg-red-500/10 text-red-500">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-xl font-bold text-gold ml-2">
                      <DollarSign className="w-4 h-4" />
                      {item.price}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>

                  {/* Dietary Badges */}
                  <div className="flex flex-wrap gap-2">
                    {item.isVegetarian && (
                      <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                        Vegetarian
                      </Badge>
                    )}
                    {item.isGlutenFree && (
                      <Badge variant="outline" className="text-xs border-blue-500 text-blue-500">
                        Gluten Free
                      </Badge>
                    )}
                    {item.isSpicy && (
                      <Badge variant="outline" className="text-xs border-red-500 text-red-500">
                        Spicy
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 border-gold text-gold hover:bg-gold hover:text-primary-foreground">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="luxury-card">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No menu items found</h3>
            <p className="text-muted-foreground">
              {searchTerm || categoryFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "No menu items have been added yet"
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminMenu;