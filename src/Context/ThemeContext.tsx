import {useState, useEffect, createContext, useContext} from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
    theme: Theme
    toggleTheme : () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeContextProviderProps {
    children : React.ReactNode
}

const getThemeFromLocalStorage = () : Theme => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme
    }
    return 'light'
}

export const ThemeContextProvider : React.FC<ThemeContextProviderProps> = ({children} : ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage)

    useEffect(() => {
        const root = document.getElementById('root')
        theme === 'dark' ? root?.classList.add('theme-dark') : root?.classList.remove('theme-dark')
        localStorage.setItem('theme', theme)
    },[theme])

    const toggleTheme = () => {
        setTheme ((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(!context) {
        throw new Error("useTheme must be used within a ThemeContextProvider");
    }
    return context;
}