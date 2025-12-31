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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Refund {
  id: string;
  paymentReference: string;
  customerName: string;
  amount: number;
  reason: string;
  status: "approved" | "pending" | "rejected" | "processed";
  requestDate: string;
  processedDate: string | null;
}

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (refund: Omit<Refund, "id">) => void;
  refund: Refund | null;
}

const RefundModal = ({ isOpen, onClose, onSubmit, refund }: RefundModalProps) => {
  const [formData, setFormData] = useState({
    paymentReference: "",
    customerName: "",
    amount: "",
    reason: "",
    status: "pending" as Refund["status"],
    requestDate: new Date().toISOString().split("T")[0],
    processedDate: "",
  });

  useEffect(() => {
    if (refund) {
      setFormData({
        paymentReference: refund.paymentReference,
        customerName: refund.customerName,
        amount: refund.amount.toString(),
        reason: refund.reason,
        status: refund.status,
        requestDate: refund.requestDate,
        processedDate: refund.processedDate || "",
      });
    } else {
      setFormData({
        paymentReference: "",
        customerName: "",
        amount: "",
        reason: "",
        status: "pending",
        requestDate: new Date().toISOString().split("T")[0],
        processedDate: "",
      });
    }
  }, [refund, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      paymentReference: formData.paymentReference,
      customerName: formData.customerName,
      amount: parseFloat(formData.amount),
      reason: formData.reason,
      status: formData.status,
      requestDate: formData.requestDate,
      processedDate: formData.processedDate || null,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {refund ? "Edit Refund" : "Add New Refund"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentReference" className="text-foreground">Payment Reference</Label>
              <Input
                id="paymentReference"
                value={formData.paymentReference}
                onChange={(e) => setFormData({ ...formData, paymentReference: e.target.value })}
                className="bg-background border-border"
                placeholder="PAY-2024-001"
                required
              />
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">Refund Amount ($)</Label>
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
              <Label htmlFor="status" className="text-foreground">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Refund["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-foreground">Reason</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="bg-background border-border min-h-[80px]"
              placeholder="Reason for refund request..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requestDate" className="text-foreground">Request Date</Label>
              <Input
                id="requestDate"
                type="date"
                value={formData.requestDate}
                onChange={(e) => setFormData({ ...formData, requestDate: e.target.value })}
                className="bg-background border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="processedDate" className="text-foreground">Processed Date</Label>
              <Input
                id="processedDate"
                type="date"
                value={formData.processedDate}
                onChange={(e) => setFormData({ ...formData, processedDate: e.target.value })}
                className="bg-background border-border"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {refund ? "Update" : "Add"} Refund
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RefundModal;
