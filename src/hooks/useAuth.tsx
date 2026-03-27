import React, { createContext, useContext } from "react";
import type { AuthContextTypes, LoginResponse } from "../types/auth.types";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = createContext<AuthContextTypes | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useLocalStorage<Partial<LoginResponse>>("user", {})

    const login = (data: LoginResponse) => {
        setUser(data)
    }

    const logout = () => {
        setUser({})
    }
    const isAuthentication = !!(user?.user?.email && user?.accessToken)

    return (
        <AuthContext value={{ user: user.user, token: user.accessToken, login, logout, isAuthentication }}>
            {children}
        </AuthContext>
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