
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

// Sample data for patients
const patients = [
    {
        id: "P001",
        name: "John Smith",
        age: 45,
        gender: "Male",
        phone: "(555) 123-4567",
        email: "john.smith@example.com",
        address: "123 Main St, Anytown, CA 12345",
        condition: "Hypertension",
        status: "Stable",
        admissionDate: "2023-04-15",
    },
    {
        id: "P002",
        name: "Sarah Johnson",
        age: 32,
        gender: "Female",
        phone: "(555) 234-5678",
        email: "sarah.johnson@example.com",
        address: "456 Oak Ave, Somewhere, CA 12345",
        condition: "Pregnancy",
        status: "Good",
        admissionDate: "2023-04-16",
    },
    {
        id: "P003",
        name: "Michael Brown",
        age: 58,
        gender: "Male",
        phone: "(555) 345-6789",
        email: "michael.brown@example.com",
        address: "789 Pine St, Nowhere, CA 12345",
        condition: "Diabetes",
        status: "Critical",
        admissionDate: "2023-04-14",
    },
    {
        id: "P004",
        name: "Emily Davis",
        age: 27,
        gender: "Female",
        phone: "(555) 456-7890",
        email: "emily.davis@example.com",
        address: "101 Elm St, Elsewhere, CA 12345",
        condition: "Appendicitis",
        status: "Recovering",
        admissionDate: "2023-04-17",
    },
    {
        id: "P005",
        name: "Robert Wilson",
        age: 62,
        gender: "Male",
        phone: "(555) 567-8901",
        email: "robert.wilson@example.com",
        address: "202 Maple Ave, Anywhere, CA 12345",
        condition: "Pneumonia",
        status: "Stable",
        admissionDate: "2023-04-13",
    },
    {
        id: "P006",
        name: "Jennifer Lee",
        age: 41,
        gender: "Female",
        phone: "(555) 678-9012",
        email: "jennifer.lee@example.com",
        address: "303 Cedar St, Someplace, CA 12345",
        condition: "Migraine",
        status: "Stable",
        admissionDate: "2023-04-18",
    },
    {
        id: "P007",
        name: "David Martinez",
        age: 53,
        gender: "Male",
        phone: "(555) 789-0123",
        email: "david.martinez@example.com",
        address: "404 Birch Ave, Othertown, CA 12345",
        condition: "Heart Disease",
        status: "Stable",
        admissionDate: "2023-04-12",
    },
    {
        id: "P008",
        name: "Lisa Anderson",
        age: 36,
        gender: "Female",
        phone: "(555) 890-1234",
        email: "lisa.anderson@example.com",
        address: "505 Walnut St, Thisplace, CA 12345",
        condition: "Asthma",
        status: "Good",
        admissionDate: "2023-04-19",
    },
    {
        id: "P009",
        name: "James Taylor",
        age: 70,
        gender: "Male",
        phone: "(555) 901-2345",
        email: "james.taylor@example.com",
        address: "606 Spruce Ave, Thatplace, CA 12345",
        condition: "Arthritis",
        status: "Stable",
        admissionDate: "2023-04-11",
    },
    {
        id: "P010",
        name: "Patricia Garcia",
        age: 29,
        gender: "Female",
        phone: "(555) 012-3456",
        email: "patricia.garcia@example.com",
        address: "707 Fir St, Wheretown, CA 12345",
        condition: "Influenza",
        status: "Recovering",
        admissionDate: "2023-04-20",
    },
]

// Define columns for patients table
const patientColumns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        accessorKey: "gender",
        header: "Gender",
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
        accessorKey: "condition",
        header: "Condition",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status")
            return (
                <div className="flex items-center">
                    <div
                        className={`mr-2 h-2 w-2 rounded-full ${status === "Critical"
                                ? "bg-red-500"
                                : status === "Stable"
                                    ? "bg-green-500"
                                    : status === "Recovering"
                                        ? "bg-yellow-500"
                                        : "bg-blue-500"
                            }`}
                    />
                    {status}
                </div>
            )
        },
    },
    {
        accessorKey: "admissionDate",
        header: "Admission Date",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <ViewPatientDialog patient={row.original} />
                    <EditPatientDialog patient={row.original} />
                </div>
            )
        },
    },
]

// View Patient Dialog Component
function ViewPatientDialog({ patient }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="View Patient">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Patient Details</DialogTitle>
                    <DialogDescription>Detailed information about {patient.name}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="font-bold">ID</Label>
                            <p>{patient.id}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Name</Label>
                            <p>{patient.name}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Age</Label>
                            <p>{patient.age}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Gender</Label>
                            <p>{patient.gender}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Phone</Label>
                            <p>{patient.phone}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Email</Label>
                            <p>{patient.email}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Address</Label>
                            <p>{patient.address}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Condition</Label>
                            <p>{patient.condition}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Status</Label>
                            <p>{patient.status}</p>
                        </div>
                        <div>
                            <Label className="font-bold">Admission Date</Label>
                            <p>{patient.admissionDate}</p>
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

// Edit Patient Dialog Component
function EditPatientDialog({ patient }) {
    const [formData, setFormData] = useState({
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        condition: patient.condition,
        status: patient.status,
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
        console.log("Updated patient data:", formData)

        toast({
            title: "Patient updated",
            description: `${patient.name}'s information has been updated.`,
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="Edit Patient">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Patient</DialogTitle>
                    <DialogDescription>Update information for {patient.name}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
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
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="condition">Condition</Label>
                                <Input id="condition" name="condition" value={formData.condition} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Stable">Stable</SelectItem>
                                        <SelectItem value="Critical">Critical</SelectItem>
                                        <SelectItem value="Recovering">Recovering</SelectItem>
                                        <SelectItem value="Good">Good</SelectItem>
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

// Add Patient Dialog Component
function AddPatientDialog() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "Male",
        phone: "",
        email: "",
        address: "",
        condition: "",
        status: "Stable",
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
        console.log("New patient data:", formData)

        toast({
            title: "Patient added",
            description: `${formData.name} has been added to the system.`,
        })

        // Reset form
        setFormData({
            name: "",
            age: "",
            gender: "Male",
            phone: "",
            email: "",
            address: "",
            condition: "",
            status: "Stable",
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Patient
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogDescription>Enter the details of the new patient</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
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
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="condition">Condition</Label>
                                <Input id="condition" name="condition" value={formData.condition} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Stable">Stable</SelectItem>
                                        <SelectItem value="Critical">Critical</SelectItem>
                                        <SelectItem value="Recovering">Recovering</SelectItem>
                                        <SelectItem value="Good">Good</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Patient</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const { toast } = useToast()
    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleExport = () => {
        // In a real app, you would generate a CSV file
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "ID,Name,Age,Gender,Phone,Email,Address,Condition,Status,Admission Date\n" +
            filteredPatients
                .map(
                    (p) =>
                        `${p.id},${p.name},${p.age},${p.gender},${p.phone},${p.email},"${p.address}",${p.condition},${p.status},${p.admissionDate}`,
                )
                .join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "patients.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
            title: "Export successful",
            description: "Patients data has been exported to CSV.",
        })
    }

    const handlePrint = () => {
        window.print()

        toast({
            title: "Print initiated",
            description: "The patient list is being sent to your printer.",
        })
    }

    return (
        <DashboardShell userType="admin">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
                <AddPatientDialog />
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <Input
                        placeholder="Search patients..."
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
                <DataTable columns={patientColumns} data={filteredPatients} />
            </div>
        </DashboardShell>
    )
}

export default PatientsPage

