
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Hospital } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useToast } from "../hooks/use-toast"
import { useAuth } from "../contexts/AuthContext"

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "patient",
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate()
    const { register } = useAuth()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        setErrors({
            ...errors,
            [name]: "",
        })
    }

    const handleRoleChange = (value) => {
        setFormData({
            ...formData,
            role: value,
        })
    }

    const validateForm = () => {
        let isValid = true
        const newErrors = { ...errors }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
            isValid = false
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format"
            isValid = false
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required"
            isValid = false
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
            isValid = false
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Remove confirmPassword before sending to API
            const { confirmPassword, ...registerData } = formData

            await register(registerData)

            toast({
                title: "Registration successful",
                description: `You have been registered as a ${formData.role}`,
            })

            // Redirect to login page
            navigate("/login")
        } catch (error) {
            toast({
                title: "Registration failed",
                description: error.response?.data?.message || "An error occurred during registration",
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
                    <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">Enter your details below to register</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john.doe@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Select onValueChange={handleRoleChange} defaultValue={formData.role}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="patient">Patient</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default RegisterPage

