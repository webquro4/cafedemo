import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const purchaseSchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),
  orderDate: z.string().min(1, "Order date is required"),
  deliveryDate: z.string().min(1, "Delivery date is required"),
  items: z.coerce.number().min(1, "At least 1 item required"),
  totalAmount: z.coerce.number().min(0, "Amount must be positive"),
  status: z.string().min(1, "Status is required"),
  paymentStatus: z.string().min(1, "Payment status is required"),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface Purchase {
  id: string;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  items: number;
  totalAmount: number;
  status: "Pending" | "Received" | "Cancelled" | "Partial";
  paymentStatus: "Paid" | "Unpaid" | "Partial";
}

interface PurchaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchase: Purchase | null;
}

const PurchaseModal = ({ open, onOpenChange, purchase }: PurchaseModalProps) => {
  const form = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      supplier: "",
      orderDate: "",
      deliveryDate: "",
      items: 1,
      totalAmount: 0,
      status: "Pending",
      paymentStatus: "Unpaid",
    },
  });

  useEffect(() => {
    if (purchase) {
      form.reset({
        supplier: purchase.supplier,
        orderDate: purchase.orderDate,
        deliveryDate: purchase.deliveryDate,
        items: purchase.items,
        totalAmount: purchase.totalAmount,
        status: purchase.status,
        paymentStatus: purchase.paymentStatus,
      });
    } else {
      form.reset({
        supplier: "",
        orderDate: "",
        deliveryDate: "",
        items: 1,
        totalAmount: 0,
        status: "Pending",
        paymentStatus: "Unpaid",
      });
    }
  }, [purchase, form]);

  const onSubmit = (data: PurchaseFormData) => {
    console.log("Purchase data:", data);
    toast.success(purchase ? "Purchase updated successfully" : "Purchase created successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{purchase ? "Edit Purchase" : "Add New Purchase"}</DialogTitle>
          <DialogDescription>
            {purchase ? "Update the purchase order details." : "Create a new purchase order."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Fresh Farms Ltd">Fresh Farms Ltd</SelectItem>
                      <SelectItem value="Ocean Harvest Co">Ocean Harvest Co</SelectItem>
                      <SelectItem value="Quality Meats Inc">Quality Meats Inc</SelectItem>
                      <SelectItem value="Dairy Delights">Dairy Delights</SelectItem>
                      <SelectItem value="Spice World">Spice World</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="orderDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="items"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Items</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Received">Received</SelectItem>
                        <SelectItem value="Partial">Partial</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Unpaid">Unpaid</SelectItem>
                        <SelectItem value="Partial">Partial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gold hover:bg-gold/90">
                {purchase ? "Update" : "Create"} Purchase
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
