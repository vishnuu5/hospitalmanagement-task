
import { useState } from "react"
import DashboardShell from "../../components/DashboardShell"
import { DataTable } from "../../components/DataTable"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DollarSign, Download, Plus, Printer } from "lucide-react"

// Sample data for invoices
const invoices = [
    {
        id: "INV001",
        patientName: "John Smith",
        patientId: "P001",
        date: "2023-04-01",
        dueDate: "2023-04-15",
        amount: 1250.0,
        status: "Paid",
        paymentMethod: "Credit Card",
        paymentDate: "2023-04-10",
    },
    {
        id: "INV002",
        patientName: "Sarah Johnson",
        patientId: "P002",
        date: "2023-04-02",
        dueDate: "2023-04-16",
        amount: 850.5,
        status: "Pending",
    },
    {
        id: "INV003",
        patientName: "Michael Brown",
        patientId: "P003",
        date: "2023-04-03",
        dueDate: "2023-04-17",
        amount: 2100.75,
        status: "Overdue",
    },
    {
        id: "INV004",
        patientName: "Emily Davis",
        patientId: "P004",
        date: "2023-04-04",
        dueDate: "2023-04-18",
        amount: 1500.25,
        status: "Paid",
        paymentMethod: "Bank Transfer",
        paymentDate: "2023-04-15",
    },
    {
        id: "INV005",
        patientName: "Robert Wilson",
        patientId: "P005",
        date: "2023-04-05",
        dueDate: "2023-04-19",
        amount: 950.0,
        status: "Pending",
    },
    {
        id: "INV006",
        patientName: "Jennifer Lee",
        patientId: "P006",
        date: "2023-04-06",
        dueDate: "2023-04-20",
        amount: 1750.5,
        status: "Paid",
        paymentMethod: "Credit Card",
        paymentDate: "2023-04-18",
    },
    {
        id: "INV007",
        patientName: "David Martinez",
        patientId: "P007",
        date: "2023-04-07",
        dueDate: "2023-04-21",
        amount: 3200.0,
        status: "Cancelled",
    },
    {
        id: "INV008",
        patientName: "Lisa Anderson",
        patientId: "P008",
        date: "2023-04-08",
        dueDate: "2023-04-22",
        amount: 1100.25,
        status: "Pending",
    },
    {
        id: "INV009",
        patientName: "James Taylor",
        patientId: "P009",
        date: "2023-04-09",
        dueDate: "2023-04-23",
        amount: 2500.75,
        status: "Overdue",
    },
    {
        id: "INV010",
        patientName: "Patricia Garcia",
        patientId: "P010",
        date: "2023-04-10",
        dueDate: "2023-04-24",
        amount: 1800.5,
        status: "Paid",
        paymentMethod: "Bank Transfer",
        paymentDate: "2023-04-20",
    },
]

// Define columns for invoices table
const invoiceColumns = [
    {
        accessorKey: "id",
        header: "Invoice ID",
    },
    {
        accessorKey: "patientName",
        header: "Patient",
    },
    {
        accessorKey: "patientId",
        header: "Patient ID",
    },
    {
        accessorKey: "date",
        header: "Issue Date",
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return formatted
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status")
            return (
                <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : status === "Overdue"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                >
                    {status}
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                        <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
]

function BillingPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const filteredInvoices = invoices.filter(
        (invoice) =>
            invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Calculate financial metrics
    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid")
    const pendingInvoices = invoices.filter((invoice) => invoice.status === "Pending")
    const overdueInvoices = invoices.filter((invoice) => invoice.status === "Overdue")

    const paidAmount = paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    const pendingAmount = pendingInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    const overdueAmount = overdueInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)

    return (
        <DashboardShell userType="admin">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Billing & Invoices</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Invoice
                </Button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(totalRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground">For current period</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Paid</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(paidAmount)}
                        </div>
                        <p className="text-xs text-muted-foreground">{paidInvoices.length} invoices</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(pendingAmount)}
                        </div>
                        <p className="text-xs text-muted-foreground">{pendingInvoices.length} invoices</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(overdueAmount)}
                        </div>
                        <p className="text-xs text-muted-foreground">{overdueInvoices.length} invoices</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-4">
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Invoices</TabsTrigger>
                        <TabsTrigger value="paid">Paid</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="overdue">Overdue</TabsTrigger>
                    </TabsList>
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-4">
                            <Input
                                placeholder="Search invoices..."
                                className="max-w-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <Button variant="outline">Export</Button>
                                <Button variant="outline">Print</Button>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <DataTable columns={invoiceColumns} data={filteredInvoices} />
                        </TabsContent>
                        <TabsContent value="paid">
                            <DataTable
                                columns={invoiceColumns}
                                data={filteredInvoices.filter((invoice) => invoice.status === "Paid")}
                            />
                        </TabsContent>
                        <TabsContent value="pending">
                            <DataTable
                                columns={invoiceColumns}
                                data={filteredInvoices.filter((invoice) => invoice.status === "Pending")}
                            />
                        </TabsContent>
                        <TabsContent value="overdue">
                            <DataTable
                                columns={invoiceColumns}
                                data={filteredInvoices.filter((invoice) => invoice.status === "Overdue")}
                            />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </DashboardShell>
    )
}

export default BillingPage

