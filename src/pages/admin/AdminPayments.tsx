import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, CreditCard, DollarSign, Clock, CheckCircle, Eye, Edit, Trash2 } from "lucide-react";
import PaymentModal from "@/components/admin/PaymentModal";

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

const mockPayments: Payment[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    customerName: "John Smith",
    amount: 250.00,
    method: "card",
    status: "completed",
    date: "2024-01-15",
    reference: "PAY-2024-001",
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    customerName: "Sarah Johnson",
    amount: 180.50,
    method: "cash",
    status: "completed",
    date: "2024-01-14",
    reference: "PAY-2024-002",
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    customerName: "Michael Brown",
    amount: 420.00,
    method: "bank_transfer",
    status: "pending",
    date: "2024-01-13",
    reference: "PAY-2024-003",
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    customerName: "Emily Davis",
    amount: 95.75,
    method: "online",
    status: "failed",
    date: "2024-01-12",
    reference: "PAY-2024-004",
  },
  {
    id: "5",
    invoiceNumber: "INV-005",
    customerName: "Robert Wilson",
    amount: 310.00,
    method: "card",
    status: "refunded",
    date: "2024-01-11",
    reference: "PAY-2024-005",
  },
];

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

  const totalPayments = payments.length;
  const completedPayments = payments.filter((p) => p.status === "completed").length;
  const pendingPayments = payments.filter((p) => p.status === "pending").length;
  const totalAmount = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleAddPayment = (paymentData: Omit<Payment, "id">) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString(),
    };
    setPayments([...payments, newPayment]);
    setIsModalOpen(false);
  };

  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setIsModalOpen(true);
  };

  const handleUpdatePayment = (paymentData: Omit<Payment, "id">) => {
    if (editingPayment) {
      setPayments(
        payments.map((p) =>
          p.id === editingPayment.id ? { ...paymentData, id: editingPayment.id } : p
        )
      );
      setEditingPayment(null);
      setIsModalOpen(false);
    }
  };

  const handleDeletePayment = (id: string) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status: Payment["status"]) => {
    const variants: Record<Payment["status"], "default" | "secondary" | "destructive" | "outline"> = {
      completed: "default",
      pending: "secondary",
      failed: "destructive",
      refunded: "outline",
    };
    return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const getMethodLabel = (method: Payment["method"]) => {
    const labels: Record<Payment["method"], string> = {
      cash: "Cash",
      card: "Card",
      bank_transfer: "Bank Transfer",
      online: "Online",
    };
    return labels[method];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Manage payment transactions</p>
        </div>
        <Button
          onClick={() => {
            setEditingPayment(null);
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Payment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Payments</p>
              <p className="text-2xl font-bold text-foreground">{totalPayments}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-foreground">{completedPayments}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground">{pendingPayments}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, invoice, or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48 bg-background border-border">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="w-full md:w-48 bg-background border-border">
            <SelectValue placeholder="Filter by method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            <SelectItem value="online">Online</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground">Reference</TableHead>
              <TableHead className="text-muted-foreground">Invoice</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Method</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayments.length > 0 ? (
              paginatedPayments.map((payment) => (
                <TableRow key={payment.id} className="border-border hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">{payment.reference}</TableCell>
                  <TableCell className="text-foreground">{payment.invoiceNumber}</TableCell>
                  <TableCell className="text-foreground">{payment.customerName}</TableCell>
                  <TableCell className="text-foreground">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-foreground">{getMethodLabel(payment.method)}</TableCell>
                  <TableCell className="text-foreground">{payment.date}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditPayment(payment)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeletePayment(payment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPayment(null);
        }}
        onSubmit={editingPayment ? handleUpdatePayment : handleAddPayment}
        payment={editingPayment}
      />
    </div>
  );
};

export default AdminPayments;
