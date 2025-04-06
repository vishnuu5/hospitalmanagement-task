
import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Check if user is logged in on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token")

                if (token) {
                    // Set default auth header for all requests
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

                    // Verify token with backend
                    const response = await axios.get(`${API_URL}/api/auth/verify`)
                    setUser(response.data.user)
                }
            } catch (error) {
                console.error("Auth check error:", error)
                localStorage.removeItem("token")
                delete axios.defaults.headers.common["Authorization"]
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            })

            const { token, user } = response.data

            // Save token and set default auth header
            localStorage.setItem("token", token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setUser(user)
            return user
        } catch (error) {
            setError(error.response?.data?.message || "Login failed")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (userData) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, userData)
            return response.data
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["Authorization"]
        navigate("/login")
    }

    const value = {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

