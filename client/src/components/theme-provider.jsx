
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
    const [theme, setTheme] = useState(() => {
        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem(storageKey)
        if (storedTheme) {
            return storedTheme
        }

        // If defaultTheme is system, check system preference
        if (defaultTheme === "system") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        }

        return defaultTheme
    })

    useEffect(() => {
        const root = window.document.documentElement

        // Remove previous theme class
        root.classList.remove("light", "dark")

        // Add current theme class
        root.classList.add(theme)

        // Store theme in localStorage
        localStorage.setItem(storageKey, theme)
    }, [theme, storageKey])

    // Listen for system theme changes
    useEffect(() => {
        if (defaultTheme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

            const handleChange = () => {
                setTheme(mediaQuery.matches ? "dark" : "light")
            }

            mediaQuery.addEventListener("change", handleChange)

            return () => {
                mediaQuery.removeEventListener("change", handleChange)
            }
        }
    }, [defaultTheme])

    const value = {
        theme,
        setTheme: (newTheme) => {
            setTheme(newTheme)
        },
    }

    return (
        <ThemeContext.Provider value={value} {...props}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context
}

