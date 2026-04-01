import React, { createContext, useContext } from "react";
import type { AuthContextTypes, LoginResponseData } from "../../features/auth/types/auth.types";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = createContext<AuthContextTypes | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useLocalStorage<LoginResponseData | null>("user", null)

    const login = (data: LoginResponseData) => {
        setUser(data)
        location.href = "/"
    }
    console.log(user)
    const logout = () => {
        setUser(null)
        location.href = "/login"
    }
    const isAuthentication = (user?.user?.email && user?.tokens?.accessToken)
    return (
        <AuthContext.Provider value={{ user: user?.user, token: user?.tokens?.accessToken, login, logout, isAuthentication }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    const { login, logout, user, token, isAuthentication } = context

    return { login, logout, user, token, isAuthentication }
}