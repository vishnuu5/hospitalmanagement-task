
import { useState } from "react"
import DashboardShell from "../../components/DashboardShell"
import { DataTable } from "../../components/DataTable"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Plus, FileDown, Printer, Eye, Pencil } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useToast } from "../../hooks/use-toast"

// Sample data for staff
const staffMembers = [
    {
        id: "S001",
        name: "Dr. Sarah Williams",
        role: "Physician",
        department: "Cardiology",
        phone: "(555) 123-4567",
        email: "sarah.williams@hospital.com",
        joinDate: "2020-01-15",
        status: "Active",
    },
    {
        id: "S002",
        name: "Dr. James Martinez",
        role: "Physician",
        department: "Neurology",
        phone: "(555) 234-5678",
        email: "james.martinez@hospital.com",
        joinDate: "2019-05-20",
        status: "Active",
    },
    {
        id: "S003",
        name: "Dr. Emily Thompson",
        role: "Surgeon",
        department: "General Surgery",
        phone: "(555) 345-6789",
        email: "emily.thompson@hospital.com",
        joinDate: "2018-11-10",
        status: "On Leave",
    },
    {
        id: "S004",
        name: "Dr. Michael Anderson",
        role: "Physician",
        department: "Endocrinology",
        phone: "(555) 456-7890",
        email: "michael.anderson@hospital.com",
        joinDate: "2021-03-05",
        status: "Active",
    },
    {
        id: "S005",
        name: "Nurse Robert Johnson",
        role: "Head Nurse",
        department: "ICU",
        phone: "(555) 567-8901",
        email: "robert.johnson@hospital.com",
        joinDate: "2017-08-22",
        status: "Active",
    },
    {
        id: "S006",
        name: "Nurse Jennifer Garcia",
        role: "Registered Nurse",
        department: "Pediatrics",
        phone: "(555) 678-9012",
        email: "jennifer.garcia@hospital.com",
        joinDate: "2019-02-14",
        status: "Active",
    },
    {
        id: "S007",
        name: "Nurse David Wilson",
        role: "Registered Nurse",
        department: "Emergency",
        phone: "(555) 789-0123",
        email: "david.wilson@hospital.com",
        joinDate: "2020-07-30",
        status: "Active",
    },
    {
        id: "S008",
        name: "Lisa Brown",
        role: "Lab Technician",
        department: "Laboratory",
        phone: "(555) 890-1234",
        email: "lisa.brown@hospital.com",
        joinDate: "2018-04-17",
        status: "Active",
    },
    {
        id: "S009",
        name: "John Davis",
        role: "Radiologist",
        department: "Radiology",
        phone: "(555) 901-2345",
        email: "john.davis@hospital.com",
        joinDate: "2019-09-08",
        status: "Inactive",
    },
    {
        id: "S010",
        name: "Patricia Lee",
        role: "Pharmacist",
        department: "Pharmacy",
        phone: "(555) 012-3456",
        email: "patricia.lee@hospital.com",
        joinDate: "2021-01-12",
        status: "Active",
    },
]

// Define columns for staff table
const staffColumns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "joinDate",
        header: "Join Date",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status")
            return (
                <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : status === "On Leave"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                >
                    {status}
                </div>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <ViewStaffDialog staff={row.original} />
                    <EditStaffDialog staff={row.original} />
                </div>
            )
        },
    },
]

// View Staff Dialog Component
function ViewStaffDialog({ staff }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="View Staff">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Staff Details</DialogTitle>
                    <DialogDescription>Detailed information about {staff.name}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="font-bold">ID</Label>
                            <p>{staff.id}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Name</Label>
                            <p>{staff.name}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Role</Label>
                            <p>{staff.role}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Department</Label>
                            <p>{staff.department}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Phone</Label>
                            <p>{staff.phone}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Email</Label>
                            <p>{staff.email}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Join Date</Label>
                            <p>{staff.joinDate}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Status</Label>
                            <p>{staff.status}</p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Edit Staff Dialog Component
function EditStaffDialog({ staff }) {
    const [formData, setFormData] = useState({
        name: staff.name,
        role: staff.role,
        department: staff.department,
        phone: staff.phone,
        email: staff.email,
        status: staff.status,
    })
    const { toast } = useToast()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you would send this data to your API
        console.log("Updated staff data:", formData)

        toast({
            title: "Staff updated",
            description: `${staff.name}'s information has been updated.`,
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="Edit Staff">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Staff</DialogTitle>
                    <DialogDescription>Update information for {staff.name}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Physician">Physician</SelectItem>
                                        <SelectItem value="Surgeon">Surgeon</SelectItem>
                                        <SelectItem value="Nurse">Nurse</SelectItem>
                                        <SelectItem value="Head Nurse">Head Nurse</SelectItem>
                                        <SelectItem value="Lab Technician">Lab Technician</SelectItem>
                                        <SelectItem value="Radiologist">Radiologist</SelectItem>
                                        <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                                        <SelectItem value="Neurology">Neurology</SelectItem>
                                        <SelectItem value="General Surgery">General Surgery</SelectItem>
                                        <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                                        <SelectItem value="ICU">ICU</SelectItem>
                                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                                        <SelectItem value="Emergency">Emergency</SelectItem>
                                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                                        <SelectItem value="Radiology">Radiology</SelectItem>
                                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="On Leave">On Leave</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

// Add Staff Dialog Component
function AddStaffDialog() {
    const [formData, setFormData] = useState({
        name: "",
        role: "Physician",
        department: "Cardiology",
        phone: "",
        email: "",
        status: "Active",
    })
    const { toast } = useToast()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you would send this data to your API
        console.log("New staff data:", formData)

        toast({
            title: "Staff added",
            description: `${formData.name} has been added to the system.`,
        })

        // Reset form
        setFormData({
            name: "",
            role: "Physician",
            department: "Cardiology",
            phone: "",
            email: "",
            status: "Active",
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Staff
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Staff</DialogTitle>
                    <DialogDescription>Enter the details of the new staff member</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Physician">Physician</SelectItem>
                                        <SelectItem value="Surgeon">Surgeon</SelectItem>
                                        <SelectItem value="Nurse">Nurse</SelectItem>
                                        <SelectItem value="Head Nurse">Head Nurse</SelectItem>
                                        <SelectItem value="Lab Technician">Lab Technician</SelectItem>
                                        <SelectItem value="Radiologist">Radiologist</SelectItem>
                                        <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                                        <SelectItem value="Neurology">Neurology</SelectItem>
                                        <SelectItem value="General Surgery">General Surgery</SelectItem>
                                        <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                                        <SelectItem value="ICU">ICU</SelectItem>
                                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                                        <SelectItem value="Emergency">Emergency</SelectItem>
                                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                                        <SelectItem value="Radiology">Radiology</SelectItem>
                                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="On Leave">On Leave</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Staff</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function StaffPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const { toast } = useToast()
    const filteredStaff = staffMembers.filter(
        (staff) =>
            staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleExport = () => {
        // In a real app, you would generate a CSV file
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "ID,Name,Role,Department,Phone,Email,Join Date,Status\n" +
            filteredStaff
                .map((s) => `${s.id},${s.name},${s.role},${s.department},${s.phone},${s.email},${s.joinDate},${s.status}`)
                .join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "staff.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
            title: "Export successful",
            description: "Staff data has been exported to CSV.",
        })
    }

    const handlePrint = () => {
        window.print()

        toast({
            title: "Print initiated",
            description: "The staff list is being sent to your printer.",
        })
    }

    return (
        <DashboardShell userType="admin">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Staff</h2>
                <AddStaffDialog />
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <Input
                        placeholder="Search staff..."
                        className="max-w-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleExport}>
                            <FileDown className="mr-2 h-4 w-4" /> Export
                        </Button>
                        <Button variant="outline" onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                    </div>
                </div>
                <DataTable columns={staffColumns} data={filteredStaff} />
            </div>
        </DashboardShell>
    )
}

export default StaffPage

