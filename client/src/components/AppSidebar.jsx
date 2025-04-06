
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
    Activity,
    Calendar,
    ClipboardList,
    FileText,
    Home,
    Hospital,
    LogOut,
    Settings,
    User,
    Users,
    Wallet,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { useToast } from "../hooks/use-toast"
import { useAuth } from "../contexts/AuthContext"

export function AppSidebar({ userType }) {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout, user } = useAuth()
    const { toast } = useToast()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [userName, setUserName] = useState(() => {
        return user?.name || (userType === "admin" ? "Admin User" : userType === "staff" ? "Staff Member" : "Patient Name")
    })

    // Update userName when user changes
    useEffect(() => {
        if (user) {
            setUserName(user.name)
        }
    }, [user])

    const handleLogout = () => {
        logout()
        toast({
            title: "Logged out",
            description: "You have been successfully logged out",
        })
    }

    const adminMenuItems = [
        { title: "Dashboard", icon: Home, path: "/dashboard/admin" },
        { title: "Patients", icon: User, path: "/dashboard/admin/patients" },
        { title: "Staff", icon: Users, path: "/dashboard/admin/staff" },
        { title: "Appointments", icon: Calendar, path: "/dashboard/admin/appointments" },
        { title: "Medical Records", icon: FileText, path: "/dashboard/admin/records" },
        { title: "Billing", icon: Wallet, path: "/dashboard/admin/billing" },
        { title: "Reports", icon: Activity, path: "/dashboard/admin/reports" },
        { title: "Settings", icon: Settings, path: "/dashboard/admin/settings" },
    ]

    const staffMenuItems = [
        { title: "Dashboard", icon: Home, path: "/dashboard/staff" },
        { title: "Patients", icon: User, path: "/dashboard/staff/patients" },
        { title: "Appointments", icon: Calendar, path: "/dashboard/staff/appointments" },
        { title: "Medical Records", icon: FileText, path: "/dashboard/staff/records" },
        { title: "Tasks", icon: ClipboardList, path: "/dashboard/staff/tasks" },
    ]

    const patientMenuItems = [
        { title: "Dashboard", icon: Home, path: "/dashboard/patient" },
        { title: "Appointments", icon: Calendar, path: "/dashboard/patient/appointments" },
        { title: "Medical Records", icon: FileText, path: "/dashboard/patient/records" },
        { title: "Prescriptions", icon: ClipboardList, path: "/dashboard/patient/prescriptions" },
        { title: "Billing", icon: Wallet, path: "/dashboard/patient/billing" },
    ]

    const menuItems = userType === "admin" ? adminMenuItems : userType === "staff" ? staffMenuItems : patientMenuItems

    return (
        <div
            className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}
        >
            <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 px-4 py-3">
                    <Hospital className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    {isSidebarOpen && <div className="font-semibold text-lg">MediCare Hospital</div>}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
                <nav className="px-2 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.title}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {isSidebarOpen && <span>{item.title}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                    {isSidebarOpen ? (
                        <>
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`}
                                        alt={userName}
                                    />
                                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">{userName}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center w-full gap-2">
                            <Avatar>
                                <AvatarImage
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`}
                                    alt={userName}
                                />
                                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <button
                className="absolute top-1/2 -right-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 transform -translate-y-1/2"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                )}
            </button>
        </div>
    )
}

