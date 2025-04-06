
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Eye, EyeOff, Hospital } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { useToast } from "../hooks/use-toast"
import { useAuth } from "../contexts/AuthContext"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const { toast } = useToast()
    const { login } = useAuth()

    // Get the redirect path from location state or default to dashboard
    const from = location.state?.from?.pathname || "/dashboard"

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const user = await login(email, password)

            toast({
                title: "Login successful",
                description: `Welcome back, ${user.name}!`,
            })

            // Redirect to the appropriate dashboard based on user role
            navigate(`/dashboard/${user.role}`)
        } catch (error) {
            toast({
                title: "Login failed",
                description: error.response?.data?.message || "Invalid email or password",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <Hospital className="h-12 w-12 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl text-center">Hospital Management System</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to access the dashboard</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                        <div className="text-center text-sm">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </div>
                    </CardFooter>
                </form>
                <div className="px-6 pb-4 pt-2">
                    <div className="text-xs text-center text-muted-foreground">
                        <p className="mb-1">Demo Accounts:</p>
                        <p>Admin: admin@hospital.com / admin123</p>
                        <p>Staff: staff@hospital.com / staff123</p>
                        <p>Patient: patient@hospital.com / patient123</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default LoginPage

