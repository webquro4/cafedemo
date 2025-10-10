import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  description: string;
  locale: string;
}

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSave: (category: Omit<Category, "id">) => void;
}

const CategoryModal = ({
  open,
  onOpenChange,
  category,
  onSave,
}: CategoryModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      locale: "en-IN",
    },
  });

  const locale = watch("locale");

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
      setValue("locale", category.locale);
    } else {
      reset();
    }
  }, [category, setValue, reset]);

  const onSubmit = (data: any) => {
    onSave(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="e.g., Starters, Mains, Desserts"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Brief description of the category"
              rows={3}
            />
          </div>

          {/* Locale */}
          <div className="space-y-2">
            <Label htmlFor="locale">Locale *</Label>
            <Select value={locale} onValueChange={(value) => setValue("locale", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select locale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-IN">en-IN (English - India)</SelectItem>
                <SelectItem value="en-US">en-US (English - US)</SelectItem>
                <SelectItem value="hi-IN">hi-IN (Hindi - India)</SelectItem>
                <SelectItem value="es-ES">es-ES (Spanish - Spain)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {category ? "Update" : "Create"} Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
