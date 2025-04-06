
import { useState, useEffect } from "react"
import { Activity, Calendar, ClipboardList, FileText, Wallet } from "lucide-react"
import DashboardShell from "../../components/DashboardShell"
import { StatCard } from "../../components/StatCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DataTable } from "../../components/DataTable"
import { Button } from "../../components/ui/button"

// Sample data for appointments
const appointments = [
    {
        id: "A001",
        doctorName: "Dr. Williams",
        department: "Cardiology",
        date: "2023-04-20",
        time: "10:00 AM",
        status: "Scheduled",
    },
    {
        id: "A002",
        doctorName: "Dr. Martinez",
        department: "General Medicine",
        date: "2023-05-05",
        time: "11:30 AM",
        status: "Confirmed",
    },
    {
        id: "A003",
        doctorName: "Dr. Thompson",
        department: "Orthopedics",
        date: "2023-05-15",
        time: "09:15 AM",
        status: "Pending",
    },
]

// Sample data for prescriptions
const prescriptions = [
    {
        id: "P001",
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2023-04-01",
        endDate: "2023-05-01",
        doctorName: "Dr. Williams",
    },
    {
        id: "P002",
        medication: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2023-04-01",
        endDate: "2023-07-01",
        doctorName: "Dr. Anderson",
    },
    {
        id: "P003",
        medication: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed for pain",
        startDate: "2023-04-15",
        endDate: "2023-04-22",
        doctorName: "Dr. Thompson",
    },
]

// Define columns for appointments table
const appointmentColumns = [
    {
        accessorKey: "id",
        header: "ID",
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
                <Button variant="outline" size="sm">
                    Reschedule
                </Button>
            )
        },
    },
]

// Define columns for prescriptions table
const prescriptionColumns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "medication",
        header: "Medication",
    },
    {
        accessorKey: "dosage",
        header: "Dosage",
    },
    {
        accessorKey: "frequency",
        header: "Frequency",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "doctorName",
        header: "Prescribed By",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <Button variant="outline" size="sm">
                    Refill Request
                </Button>
            )
        },
    },
]

function PatientDashboard() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <DashboardShell userType="patient">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Patient Dashboard</h2>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Upcoming Appointments" value="3" icon={Calendar} />
                <StatCard title="Active Prescriptions" value="3" icon={ClipboardList} />
                <StatCard title="Medical Records" value="8" icon={FileText} />
                <StatCard title="Outstanding Balance" value="$250.00" icon={Wallet} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Health Metrics</CardTitle>
                        <CardDescription>Your recent health measurements</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center">
                            <div className="text-center">
                                <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Health metrics chart would be displayed here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Next Appointment</CardTitle>
                        <CardDescription>Details for your upcoming appointment</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <div className="text-sm font-medium">Doctor</div>
                                <div className="text-sm">Dr. Williams</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm font-medium">Department</div>
                                <div className="text-sm">Cardiology</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm font-medium">Date</div>
                                <div className="text-sm">April 20, 2023</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm font-medium">Time</div>
                                <div className="text-sm">10:00 AM</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-sm font-medium">Location</div>
                                <div className="text-sm">Main Building, Room 305</div>
                            </div>
                            <div className="pt-2">
                                <Button className="w-full">Reschedule Appointment</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <Tabs defaultValue="appointments">
                    <TabsList>
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="appointments" className="mt-4">
                        <DataTable columns={appointmentColumns} data={appointments} />
                    </TabsContent>
                    <TabsContent value="prescriptions" className="mt-4">
                        <DataTable columns={prescriptionColumns} data={prescriptions} />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardShell>
    )
}

export default PatientDashboard

