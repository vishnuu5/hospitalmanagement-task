
import { useState } from "react"
import DashboardShell from "../../components/DashboardShell"
import { DataTable } from "../../components/DataTable"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Plus } from "lucide-react"

// Sample data for appointments
const appointments = [
    {
        id: "A001",
        patientName: "John Smith",
        patientId: "P001",
        doctorName: "Dr. Williams",
        department: "Cardiology",
        date: "2023-04-20",
        time: "10:00 AM",
        status: "Scheduled",
        type: "Regular",
    },
    {
        id: "A002",
        patientName: "Sarah Johnson",
        patientId: "P002",
        doctorName: "Dr. Martinez",
        department: "Obstetrics",
        date: "2023-04-21",
        time: "11:30 AM",
        status: "Confirmed",
        type: "Follow-up",
    },
    {
        id: "A003",
        patientName: "Michael Brown",
        patientId: "P003",
        doctorName: "Dr. Anderson",
        department: "Endocrinology",
        date: "2023-04-22",
        time: "09:15 AM",
        status: "Scheduled",
        type: "Regular",
    },
    {
        id: "A004",
        patientName: "Emily Davis",
        patientId: "P004",
        doctorName: "Dr. Thompson",
        department: "Surgery",
        date: "2023-04-23",
        time: "02:00 PM",
        status: "Confirmed",
        type: "Consultation",
    },
    {
        id: "A005",
        patientName: "Robert Wilson",
        patientId: "P005",
        doctorName: "Dr. Garcia",
        department: "Pulmonology",
        date: "2023-04-24",
        time: "03:30 PM",
        status: "Scheduled",
        type: "Regular",
    },
    {
        id: "A006",
        patientName: "Jennifer Lee",
        patientId: "P006",
        doctorName: "Dr. Williams",
        department: "Cardiology",
        date: "2023-04-25",
        time: "10:30 AM",
        status: "Completed",
        type: "Follow-up",
    },
    {
        id: "A007",
        patientName: "David Martinez",
        patientId: "P007",
        doctorName: "Dr. Williams",
        department: "Cardiology",
        date: "2023-04-26",
        time: "11:00 AM",
        status: "Cancelled",
        type: "Regular",
    },
    {
        id: "A008",
        patientName: "Lisa Anderson",
        patientId: "P008",
        doctorName: "Dr. Thompson",
        department: "Surgery",
        date: "2023-04-27",
        time: "09:00 AM",
        status: "Scheduled",
        type: "Consultation",
    },
    {
        id: "A009",
        patientName: "James Taylor",
        patientId: "P009",
        doctorName: "Dr. Martinez",
        department: "Obstetrics",
        date: "2023-04-28",
        time: "01:30 PM",
        status: "No Show",
        type: "Regular",
    },
    {
        id: "A010",
        patientName: "Patricia Garcia",
        patientId: "P010",
        doctorName: "Dr. Anderson",
        department: "Endocrinology",
        date: "2023-04-29",
        time: "04:00 PM",
        status: "Scheduled",
        type: "Follow-up",
    },
]

// Define columns for appointments table
const appointmentColumns = [
    {
        accessorKey: "id",
        header: "ID",
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
        accessorKey: "doctorName",
        header: "Doctor",
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "time",
        header: "Time",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.getValue("type")
            return (
                <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${type === "Regular"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : type === "Follow-up"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                            : type === "Emergency"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }`}
                >
                    {type}
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status")
            return (
                <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Confirmed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : status === "Scheduled"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : status === "Completed"
                                ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                : status === "Cancelled"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
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
                    <Button variant="outline" size="sm">
                        View
                    </Button>
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                </div>
            )
        },
    },
]

function AppointmentsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const filteredAppointments = appointments.filter(
        (appointment) =>
            appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <DashboardShell userType="admin">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
                </Button>
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                    <Input
                        placeholder="Search appointments..."
                        className="max-w-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                        <Button variant="outline">Export</Button>
                        <Button variant="outline">Print</Button>
                    </div>
                </div>
                <DataTable columns={appointmentColumns} data={filteredAppointments} />
            </div>
        </DashboardShell>
    )
}

export default AppointmentsPage

