import { AppSidebar } from "./AppSidebar"
import { DashboardHeader } from "./DashboardHeader"

function DashboardShell({ children, userType }) {
    return (
        <div className="flex min-h-screen">
            <AppSidebar userType={userType} />
            <div className="flex flex-col flex-1">
                <DashboardHeader />
                <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}

export default DashboardShell

