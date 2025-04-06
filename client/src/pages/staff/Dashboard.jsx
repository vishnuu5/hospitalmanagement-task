
import { useState, useEffect } from "react"
import { Activity, Calendar, ClipboardList, User } from "lucide-react"
import DashboardShell from "../../components/DashboardShell"
import { StatCard } from "../../components/StatCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DataTable } from "../../components/DataTable"

// Sample data for assigned patients
const patients = [
    {
        id: "P001",
        name: "John Smith",
        age: 45,
        gender: "Male",
        room: "201",
        condition: "Hypertension",
        status: "Stable",
    },
    {
        id: "P002",
        name: "Sarah Johnson",
        age: 32,
        gender: "Female",
        room: "202",
        condition: "Pregnancy",
        status: "Good",
    },
    {
        id: "P003",
        name: "Michael Brown",
        age: 58,
        gender: "Male",
        room: "205",
        condition: "Diabetes",
        status: "Critical",
    },
    {
        id: "P004",
        name: "Emily Davis",
        age: 27,
        gender: "Female",
        room: "210",
        condition: "Appendicitis",
        status: "Recovering",
    },
]

// Sample data for today's tasks
const tasks = [
    {
        id: "T001",
        description: "Administer medication",
        patientName: "John Smith",
        room: "201",
        time: "08:00 AM",
        priority: "High",
        status: "Completed",
    },
    {
        id: "T002",
        description: "Check vital signs",
        patientName: "Sarah Johnson",
        room: "202",
        time: "09:30 AM",
        priority: "Medium",
        status: "Completed",
    },
    {
        id: "T003",
        description: "Change IV fluid",
        patientName: "Michael Brown",
        room: "205",
        time: "11:00 AM",
        priority: "High",
        status: "In Progress",
    },
    {
        id: "T004",
        description: "Post-surgery check",
        patientName: "Emily Davis",
        room: "210",
        time: "02:00 PM",
        priority: "High",
        status: "Pending",
    },
    {
        id: "T005",
        description: "Update patient chart",
        patientName: "John Smith",
        room: "201",
        time: "04:30 PM",
        priority: "Medium",
        status: "Pending",
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
        accessorKey: "room",
        header: "Room",
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
]

// Define columns for tasks table
const taskColumns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "description",
        header: "Task",
    },
    {
        accessorKey: "patientName",
        header: "Patient",
    },
    {
        accessorKey: "room",
        header: "Room",
    },
    {
        accessorKey: "time",
        header: "Time",
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
            const priority = row.getValue("priority")
            return (
                <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }`}
                >
                    {priority}
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
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : status === "In Progress"
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

function StaffDashboard() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <DashboardShell userType="staff">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Staff Dashboard</h2>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Assigned Patients" value="4" icon={User} />
                <StatCard
                    title="Today's Tasks"
                    value="5"
                    icon={ClipboardList}
                    description="2 completed, 1 in progress, 2 pending"
                />
                <StatCard title="Upcoming Appointments" value="3" icon={Calendar} />
                <StatCard title="Shift Hours" value="8:00 AM - 4:00 PM" icon={Activity} />
            </div>
            <div className="mt-4">
                <Tabs defaultValue="patients">
                    <TabsList>
                        <TabsTrigger value="patients">Assigned Patients</TabsTrigger>
                        <TabsTrigger value="tasks">Today's Tasks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="patients" className="mt-4">
                        <DataTable columns={patientColumns} data={patients} />
                    </TabsContent>
                    <TabsContent value="tasks" className="mt-4">
                        <DataTable columns={taskColumns} data={tasks} />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardShell>
    )
}

export default StaffDashboard

