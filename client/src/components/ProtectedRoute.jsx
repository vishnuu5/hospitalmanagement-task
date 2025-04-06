
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function ProtectedRoute({ children, allowedRoles = [] }) {
    const { user, isLoading } = useAuth()
    const location = useLocation()

    if (isLoading) {
        // You could render a loading spinner here
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard if user doesn't have permission
        return <Navigate to={`/dashboard/${user.role}`} replace />
    }

    return children
}

export default ProtectedRoute

