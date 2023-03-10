import { createContext, useState } from "react"

export const AuthContext = createContext({})

const AuthProvider = ({ children } : any) => {
    // @ts-ignore
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('@user')) ?? null)
    const [error, setError] = useState(null)

    return (
        <AuthContext.Provider value={{ user, setUser, error, setError }}>
            <div className="min-h-screen bg-blue-50 dark:bg-gray-400">{children}</div>
        </AuthContext.Provider>
    )
}

export default AuthProvider