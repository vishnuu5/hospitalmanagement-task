
import { useState, useEffect } from "react"
import { Activity, Calendar, DollarSign, User, Users } from "lucide-react"
import DashboardShell from "../../components/DashboardShell"
import { StatCard } from "../../components/StatCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DataTable } from "../../components/DataTable"

// Sample data for recent patients
const patients = [
    {
        id: "P001",
        name: "John Smith",
        age: 45,
        gender: "Male",
        condition: "Hypertension",
        status: "Stable",
        admissionDate: "2023-04-15",
    },
    {
        id: "P002",
        name: "Sarah Johnson",
        age: 32,
        gender: "Female",
        condition: "Pregnancy",
        status: "Good",
        admissionDate: "2023-04-16",
    },
    {
        id: "P003",
        name: "Michael Brown",
        age: 58,
        gender: "Male",
        condition: "Diabetes",
        status: "Critical",
        admissionDate: "2023-04-14",
    },
    {
        id: "P004",
        name: "Emily Davis",
        age: 27,
        gender: "Female",
        condition: "Appendicitis",
        status: "Recovering",
        admissionDate: "2023-04-17",
    },
    {
        id: "P005",
        name: "Robert Wilson",
        age: 62,
        gender: "Male",
        condition: "Pneumonia",
        status: "Stable",
        admissionDate: "2023-04-13",
    },
]

// Sample data for upcoming appointments
const appointments = [
    {
        id: "A001",
        patientName: "John Smith",
        doctorName: "Dr. Williams",
        department: "Cardiology",
        date: "2023-04-20",
        time: "10:00 AM",
        status: "Scheduled",
    },
    {
        id: "A002",
        patientName: "Sarah Johnson",
        doctorName: "Dr. Martinez",
        department: "Obstetrics",
        date: "2023-04-21",
        time: "11:30 AM",
        status: "Confirmed",
    },
    {
        id: "A003",
        patientName: "Michael Brown",
        doctorName: "Dr. Anderson",
        department: "Endocrinology",
        date: "2023-04-22",
        time: "09:15 AM",
        status: "Pending",
    },
    {
        id: "A004",
        patientName: "Emily Davis",
        doctorName: "Dr. Thompson",
        department: "Surgery",
        date: "2023-04-23",
        time: "02:00 PM",
        status: "Confirmed",
    },
    {
        id: "A005",
        patientName: "Robert Wilson",
        doctorName: "Dr. Garcia",
        department: "Pulmonology",
        date: "2023-04-24",
        time: "03:30 PM",
        status: "Scheduled",
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
]

function AdminDashboard() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <DashboardShell userType="admin">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Patients" value="1,284" icon={User} trend={{ value: 12, isPositive: true }} />
                <StatCard title="Staff Members" value="64" icon={Users} trend={{ value: 2, isPositive: true }} />
                <StatCard title="Appointments Today" value="32" icon={Calendar} trend={{ value: 5, isPositive: false }} />
                <StatCard title="Revenue This Month" value="$48,294" icon={DollarSign} trend={{ value: 8, isPositive: true }} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Hospital Occupancy</CardTitle>
                        <CardDescription>Current bed occupancy rate across departments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                            <div className="text-center">
                                <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Occupancy chart would be displayed here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Department Statistics</CardTitle>
                        <CardDescription>Patient distribution by department</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                            <div className="text-center">
                                <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Department statistics would be displayed here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <Tabs defaultValue="patients">
                    <TabsList>
                        <TabsTrigger value="patients">Recent Patients</TabsTrigger>
                        <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
                    </TabsList>
                    <TabsContent value="patients" className="mt-4">
                        <DataTable columns={patientColumns} data={patients} />
                    </TabsContent>
                    <TabsContent value="appointments" className="mt-4">
                        <DataTable columns={appointmentColumns} data={appointments} />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardShell>
    )
}

export default AdminDashboard

