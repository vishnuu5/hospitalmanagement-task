import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import { ThemeProvider } from "./components/theme-provider"
import { AuthProvider } from "./contexts/AuthContext"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminPatients from "./pages/admin/Patients"
import AdminStaff from "./pages/admin/Staff"
import AdminAppointments from "./pages/admin/Appointments"
import AdminBilling from "./pages/admin/Billing"
import AdminReports from "./pages/admin/Reports"
import StaffDashboard from "./pages/staff/Dashboard"
import PatientDashboard from "./pages/patient/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin Routes */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/patients"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPatients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/staff"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminStaff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/appointments"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/billing"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminBilling />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/reports"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminReports />
                </ProtectedRoute>
              }
            />

            {/* Staff Routes */}
            <Route
              path="/dashboard/staff"
              element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />

            {/* Patient Routes */}
            <Route
              path="/dashboard/patient"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}


export default App

