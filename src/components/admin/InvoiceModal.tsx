import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Plus, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Service {
  type: string;
  description: string;
  amount: number;
  tax: number;
}

interface Adjustment {
  label: string;
  type: string;
  amount: number;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoiceData: any) => void;
}

const InvoiceModal = ({ isOpen, onClose, onSubmit }: InvoiceModalProps) => {
  const [formData, setFormData] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    customerName: "",
    customerPhone: "",
    tableName: "",
    guestsCount: 1,
    notes: "",
    status: "Pending"
  });

  const [services, setServices] = useState<Service[]>([
    { type: "", description: "", amount: 0, tax: 0 }
  ]);

  const [adjustments, setAdjustments] = useState<Adjustment[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount whenever services or adjustments change
  useEffect(() => {
    const servicesTotal = services.reduce((sum, service) => {
      const serviceAmount = service.amount || 0;
      const taxAmount = (serviceAmount * (service.tax || 0)) / 100;
      return sum + serviceAmount + taxAmount;
    }, 0);

    const adjustmentsTotal = adjustments.reduce((sum, adjustment) => {
      const adjustmentAmount = adjustment.amount || 0;
      return adjustment.type === "discount" 
        ? sum - adjustmentAmount 
        : sum + adjustmentAmount;
    }, 0);

    setTotalAmount(servicesTotal + adjustmentsTotal);
  }, [services, adjustments]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    setServices(prev => [...prev, { type: "", description: "", amount: 0, tax: 0 }]);
  };

  const updateService = (index: number, field: string, value: any) => {
    setServices(prev => prev.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    ));
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(prev => prev.filter((_, i) => i !== index));
    }
  };

  const addAdjustment = () => {
    setAdjustments(prev => [...prev, { label: "", type: "discount", amount: 0 }]);
  };

  const updateAdjustment = (index: number, field: string, value: any) => {
    setAdjustments(prev => prev.map((adjustment, i) => 
      i === index ? { ...adjustment, [field]: value } : adjustment
    ));
  };

  const removeAdjustment = (index: number) => {
    setAdjustments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData = {
      ...formData,
      services,
      adjustments,
      totalAmount,
      paidAmount: 0,
      balanceDue: totalAmount
    };
    onSubmit(invoiceData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-playfair font-bold text-gold">Create New Invoice</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-gold">Invoice Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="invoiceDate">Invoice Date *</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-gold">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Customer Phone</Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="tableName">Table Name</Label>
                  <Input
                    id="tableName"
                    value={formData.tableName}
                    onChange={(e) => handleInputChange('tableName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="guestsCount">Guests Count *</Label>
                  <Input
                    id="guestsCount"
                    type="number"
                    min="1"
                    value={formData.guestsCount}
                    onChange={(e) => handleInputChange('guestsCount', parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="luxury-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gold">Services</CardTitle>
                <Button type="button" variant="outline" onClick={addService}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Service {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(index)}
                      disabled={services.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <Label>Service Type *</Label>
                      <Select value={service.type} onValueChange={(value) => updateService(index, 'type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recipe">Recipe</SelectItem>
                          <SelectItem value="category">Category</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="branch">Branch</SelectItem>
                          <SelectItem value="reservation">Reservation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={service.description}
                        onChange={(e) => updateService(index, 'description', e.target.value)}
                        placeholder="Service description"
                      />
                    </div>
                    <div>
                      <Label>Amount (₹) *</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={service.amount}
                        onChange={(e) => updateService(index, 'amount', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Tax (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={service.tax}
                        onChange={(e) => updateService(index, 'tax', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Adjustments */}
          <Card className="luxury-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gold">Adjustments</CardTitle>
                <Button type="button" variant="outline" onClick={addAdjustment}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Adjustment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {adjustments.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No adjustments added</p>
              )}
              {adjustments.map((adjustment, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Adjustment {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAdjustment(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label>Label *</Label>
                      <Input
                        value={adjustment.label}
                        onChange={(e) => updateAdjustment(index, 'label', e.target.value)}
                        placeholder="e.g., Discount, Service Charge"
                        required
                      />
                    </div>
                    <div>
                      <Label>Type *</Label>
                      <Select value={adjustment.type} onValueChange={(value) => updateAdjustment(index, 'type', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="discount">Discount</SelectItem>
                          <SelectItem value="surcharge">Surcharge</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Amount (₹) *</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={adjustment.amount}
                        onChange={(e) => updateAdjustment(index, 'amount', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-gold">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional notes or comments..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Total Calculation */}
          <Card className="luxury-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-gold" />
                  <span className="text-lg font-medium">Total Amount:</span>
                </div>
                <span className="text-2xl font-bold text-gold">₹{totalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gold text-primary-foreground hover:bg-gold-dark">
              Create Invoice
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default InvoiceModal;