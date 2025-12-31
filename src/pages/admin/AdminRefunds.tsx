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
import { Plus, Search, RotateCcw, DollarSign, Clock, CheckCircle, Eye, Edit, Trash2 } from "lucide-react";
import RefundModal from "@/components/admin/RefundModal";

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

const mockRefunds: Refund[] = [
  {
    id: "1",
    paymentReference: "PAY-2024-001",
    customerName: "John Smith",
    amount: 50.00,
    reason: "Order cancelled",
    status: "processed",
    requestDate: "2024-01-15",
    processedDate: "2024-01-16",
  },
  {
    id: "2",
    paymentReference: "PAY-2024-002",
    customerName: "Sarah Johnson",
    amount: 180.50,
    reason: "Wrong order delivered",
    status: "approved",
    requestDate: "2024-01-14",
    processedDate: null,
  },
  {
    id: "3",
    paymentReference: "PAY-2024-003",
    customerName: "Michael Brown",
    amount: 75.00,
    reason: "Quality issue",
    status: "pending",
    requestDate: "2024-01-13",
    processedDate: null,
  },
  {
    id: "4",
    paymentReference: "PAY-2024-004",
    customerName: "Emily Davis",
    amount: 95.75,
    reason: "Duplicate charge",
    status: "rejected",
    requestDate: "2024-01-12",
    processedDate: "2024-01-13",
  },
  {
    id: "5",
    paymentReference: "PAY-2024-005",
    customerName: "Robert Wilson",
    amount: 120.00,
    reason: "Service not provided",
    status: "pending",
    requestDate: "2024-01-11",
    processedDate: null,
  },
];

const AdminRefunds = () => {
  const [refunds, setRefunds] = useState<Refund[]>(mockRefunds);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRefund, setEditingRefund] = useState<Refund | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRefunds = refunds.filter((refund) => {
    const matchesSearch =
      refund.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.paymentReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || refund.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRefunds = filteredRefunds.slice(startIndex, endIndex);

  const totalRefunds = refunds.length;
  const processedRefunds = refunds.filter((r) => r.status === "processed").length;
  const pendingRefunds = refunds.filter((r) => r.status === "pending").length;
  const totalAmount = refunds
    .filter((r) => r.status === "processed")
    .reduce((sum, r) => sum + r.amount, 0);

  const handleAddRefund = (refundData: Omit<Refund, "id">) => {
    const newRefund: Refund = {
      ...refundData,
      id: Date.now().toString(),
    };
    setRefunds([...refunds, newRefund]);
    setIsModalOpen(false);
  };

  const handleEditRefund = (refund: Refund) => {
    setEditingRefund(refund);
    setIsModalOpen(true);
  };

  const handleUpdateRefund = (refundData: Omit<Refund, "id">) => {
    if (editingRefund) {
      setRefunds(
        refunds.map((r) =>
          r.id === editingRefund.id ? { ...refundData, id: editingRefund.id } : r
        )
      );
      setEditingRefund(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteRefund = (id: string) => {
    setRefunds(refunds.filter((r) => r.id !== id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status: Refund["status"]) => {
    const variants: Record<Refund["status"], "default" | "secondary" | "destructive" | "outline"> = {
      processed: "default",
      approved: "secondary",
      pending: "outline",
      rejected: "destructive",
    };
    return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Refunds</h1>
          <p className="text-muted-foreground">Manage refund requests</p>
        </div>
        <Button
          onClick={() => {
            setEditingRefund(null);
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Refund
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <RotateCcw className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Refunds</p>
              <p className="text-2xl font-bold text-foreground">{totalRefunds}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Processed</p>
              <p className="text-2xl font-bold text-foreground">{processedRefunds}</p>
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
              <p className="text-2xl font-bold text-foreground">{pendingRefunds}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Refunded</p>
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
            placeholder="Search by customer, reference, or reason..."
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
            <SelectItem value="processed">Processed</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground">Payment Ref</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Reason</TableHead>
              <TableHead className="text-muted-foreground">Request Date</TableHead>
              <TableHead className="text-muted-foreground">Processed Date</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRefunds.length > 0 ? (
              paginatedRefunds.map((refund) => (
                <TableRow key={refund.id} className="border-border hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">{refund.paymentReference}</TableCell>
                  <TableCell className="text-foreground">{refund.customerName}</TableCell>
                  <TableCell className="text-foreground">${refund.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-foreground max-w-[200px] truncate">{refund.reason}</TableCell>
                  <TableCell className="text-foreground">{refund.requestDate}</TableCell>
                  <TableCell className="text-foreground">{refund.processedDate || "-"}</TableCell>
                  <TableCell>{getStatusBadge(refund.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditRefund(refund)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteRefund(refund.id)}
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
                  No refunds found
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

      <RefundModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRefund(null);
        }}
        onSubmit={editingRefund ? handleUpdateRefund : handleAddRefund}
        refund={editingRefund}
      />
    </div>
  );
};

export default AdminRefunds;
