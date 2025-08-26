import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { X, Upload, DollarSign } from "lucide-react";
import { addMenuItem, updateMenuItem, MenuItem } from "@/store/slices/menuSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: MenuItem | null;
}

const MenuItemModal = ({ isOpen, onClose, item }: MenuItemModalProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "starters" as MenuItem['category'],
    image: "",
    isVegetarian: false,
    isGlutenFree: false,
    isSpicy: false,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        image: item.image || "",
        isVegetarian: item.isVegetarian || false,
        isGlutenFree: item.isGlutenFree || false,
        isSpicy: item.isSpicy || false,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "starters",
        image: "",
        isVegetarian: false,
        isGlutenFree: false,
        isSpicy: false,
      });
    }
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const menuItem: MenuItem = {
        id: item?.id || Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image || undefined,
        isVegetarian: formData.isVegetarian,
        isGlutenFree: formData.isGlutenFree,
        isSpicy: formData.isSpicy,
      };

      if (item) {
        dispatch(updateMenuItem(menuItem));
        toast({
          title: "Success",
          description: "Menu item updated successfully",
        });
      } else {
        dispatch(addMenuItem(menuItem));
        toast({
          title: "Success",
          description: "Menu item added successfully",
        });
      }

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save menu item",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { value: "starters", label: "Starters" },
    { value: "mains", label: "Mains" },  
    { value: "desserts", label: "Desserts" },
    { value: "drinks", label: "Drinks" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-gold">
            {item ? "Edit Menu Item" : "Add New Menu Item"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter item name"
                className="bg-input border-border focus:border-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="pl-10 bg-input border-border focus:border-gold"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the menu item..."
              className="bg-input border-border focus:border-gold min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as MenuItem['category'] })}>
                <SelectTrigger className="bg-input border-border focus:border-gold">
                  <SelectValue placeholder="Select category" />
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

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="bg-input border-border focus:border-gold"
              />
            </div>
          </div>

          {/* Dietary Options */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Dietary Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="vegetarian" className="text-sm">Vegetarian</Label>
                <Switch
                  id="vegetarian"
                  checked={formData.isVegetarian}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVegetarian: checked })}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="glutenFree" className="text-sm">Gluten Free</Label>
                <Switch
                  id="glutenFree"
                  checked={formData.isGlutenFree}
                  onCheckedChange={(checked) => setFormData({ ...formData, isGlutenFree: checked })}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="spicy" className="text-sm">Spicy</Label>
                <Switch
                  id="spicy"
                  checked={formData.isSpicy}
                  onCheckedChange={(checked) => setFormData({ ...formData, isSpicy: checked })}
                />
              </div>
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
              {isLoading ? "Saving..." : item ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemModal;