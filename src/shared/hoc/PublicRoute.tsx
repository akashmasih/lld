import type React from "react"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthentication } = useAuth()
    if (isAuthentication) {
        return <Navigate to="/" replace />
    }
    return children
}

export default PublicRoute