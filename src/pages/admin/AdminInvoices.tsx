import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, Plus, Eye, Edit, Trash2, FileText, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminInvoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Mock invoice data
  const [invoicesList] = useState([
    {
      id: "1",
      invoiceNumber: "INV-001",
      invoiceDate: "2024-01-20",
      customerName: "John Smith",
      tableName: "Table 5",
      totalAmount: 1250,
      paidAmount: 1250,
      balanceDue: 0,
      status: "Paid"
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      invoiceDate: "2024-01-20",
      customerName: null,
      tableName: "Table 3",
      totalAmount: 850,
      paidAmount: 0,
      balanceDue: 850,
      status: "Pending"
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      invoiceDate: "2024-01-21",
      customerName: "Sarah Johnson",
      tableName: "Table 8",
      totalAmount: 2100,
      paidAmount: 1000,
      balanceDue: 1100,
      status: "Partially Paid"
    },
    {
      id: "4",
      invoiceNumber: "INV-004",
      invoiceDate: "2024-01-21",
      customerName: "Mike Wilson",
      tableName: null,
      totalAmount: 750,
      paidAmount: 0,
      balanceDue: 750,
      status: "Cancelled"
    },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      "Paid": "bg-green-500/10 text-green-500 border-green-500/20",
      "Pending": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      "Partially Paid": "bg-orange-500/10 text-orange-500 border-orange-500/20",
      "Cancelled": "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.Pending}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const filteredInvoices = invoicesList.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.customerName && invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (invoice.tableName && invoice.tableName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredInvoices.length / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-gold">Invoices</h1>
          <p className="text-muted-foreground">Manage all restaurant invoices and payments</p>
        </div>
        <Button className="bg-gold text-primary-foreground hover:bg-gold-dark">
          <Plus className="w-4 h-4 mr-2" />
          Add New Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-gold" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">{invoicesList.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(invoicesList.reduce((sum, inv) => sum + inv.totalAmount, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(invoicesList.reduce((sum, inv) => sum + inv.paidAmount, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Balance Due</p>
                <p className="text-2xl font-bold">{formatCurrency(invoicesList.reduce((sum, inv) => sum + inv.balanceDue, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="luxury-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by invoice number, customer, or table..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border focus:border-gold"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-input border-border focus:border-gold">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="text-gold">All Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice No</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Total (₹)</TableHead>
                  <TableHead>Paid (₹)</TableHead>
                  <TableHead>Balance (₹)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInvoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-border hover:bg-muted/30"
                  >
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{formatDate(invoice.invoiceDate)}</TableCell>
                    <TableCell>{invoice.customerName || "Walk-in"}</TableCell>
                    <TableCell>{invoice.tableName || "-"}</TableCell>
                    <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
                    <TableCell>{formatCurrency(invoice.paidAmount)}</TableCell>
                    <TableCell>{formatCurrency(invoice.balanceDue)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No invoices found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "No invoices have been created yet"
                }
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredInvoices.length)} of {filteredInvoices.length} invoices
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInvoices;