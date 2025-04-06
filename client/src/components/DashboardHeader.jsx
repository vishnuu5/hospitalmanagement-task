
import { useState, useEffect } from "react"
import { Bell, Moon, Search, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function DashboardHeader() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New patient registered", time: "5 minutes ago" },
        { id: 2, message: "Dr. Smith updated a medical record", time: "10 minutes ago" },
        { id: 3, message: "Appointment reminder: Patient #1234", time: "30 minutes ago" },
    ])

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex flex-1 items-center gap-4 md:gap-6">
                <form className="hidden flex-1 sm:flex sm:max-w-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
                    </div>
                </form>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                    {notifications.length}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <div className="flex items-center justify-between border-b px-4 py-2">
                                <span className="font-medium">Notifications</span>
                                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-600">
                                    Mark all as read
                                </Button>
                            </div>
                            <div className="max-h-96 overflow-auto">
                                {notifications.map((notification) => (
                                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                                        <div className="font-medium">{notification.message}</div>
                                        <div className="text-xs text-muted-foreground">{notification.time}</div>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        </header>
    )
}

