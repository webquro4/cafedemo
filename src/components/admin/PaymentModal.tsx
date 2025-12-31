import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Payment {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  method: "cash" | "card" | "bank_transfer" | "online";
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  reference: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payment: Omit<Payment, "id">) => void;
  payment: Payment | null;
}

const PaymentModal = ({ isOpen, onClose, onSubmit, payment }: PaymentModalProps) => {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    customerName: "",
    amount: "",
    method: "card" as Payment["method"],
    status: "pending" as Payment["status"],
    date: new Date().toISOString().split("T")[0],
    reference: "",
  });

  useEffect(() => {
    if (payment) {
      setFormData({
        invoiceNumber: payment.invoiceNumber,
        customerName: payment.customerName,
        amount: payment.amount.toString(),
        method: payment.method,
        status: payment.status,
        date: payment.date,
        reference: payment.reference,
      });
    } else {
      setFormData({
        invoiceNumber: "",
        customerName: "",
        amount: "",
        method: "card",
        status: "pending",
        date: new Date().toISOString().split("T")[0],
        reference: `PAY-${Date.now()}`,
      });
    }
  }, [payment, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      invoiceNumber: formData.invoiceNumber,
      customerName: formData.customerName,
      amount: parseFloat(formData.amount),
      method: formData.method,
      status: formData.status,
      date: formData.date,
      reference: formData.reference,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {payment ? "Edit Payment" : "Add New Payment"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference" className="text-foreground">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber" className="text-foreground">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-foreground">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="bg-background border-border"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="method" className="text-foreground">Payment Method</Label>
              <Select
                value={formData.method}
                onValueChange={(value: Payment["method"]) =>
                  setFormData({ ...formData, method: value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Payment["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {payment ? "Update" : "Add"} Payment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
