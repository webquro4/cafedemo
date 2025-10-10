import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Pencil, Trash2, Search, Filter } from "lucide-react";
import CategoryModal from "@/components/admin/CategoryModal";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  description: string;
  locale: string;
}

const AdminCategories = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("Name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Starters",
      description: "Light appetizers",
      locale: "en-IN",
    },
    {
      id: "2",
      name: "Mains",
      description: "Rich and hearty",
      locale: "en-IN",
    },
    {
      id: "3",
      name: "Beverages",
      description: "Sweet treats",
      locale: "en-IN",
    },
  ]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast({
      title: "Category deleted",
      description: "The category has been successfully deleted.",
    });
  };

  const handleSaveCategory = (category: Omit<Category, "id">) => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...category, id: editingCategory.id }
            : cat
        )
      );
      toast({
        title: "Category updated",
        description: "The category has been successfully updated.",
      });
    } else {
      const newCategory = {
        ...category,
        id: Date.now().toString(),
      };
      setCategories([...categories, newCategory]);
      toast({
        title: "Category created",
        description: "The category has been successfully created.",
      });
    }
    setIsModalOpen(false);
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-playfair font-bold text-foreground">
          Category Management
        </h1>
        <div className="flex items-center justify-between w-full">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by: {filterBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterBy("Name")}>
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterBy("Locale")}>
                  Locale
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterBy("Order")}>
                  Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleAddCategory}>
              Add New Category
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="cursor-pointer">Locale</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.locale}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="View Category"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditCategory(category)}
                        title="Edit Category"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Category Modal */}
      <CategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        category={editingCategory}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default AdminCategories;
