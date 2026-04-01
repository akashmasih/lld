import type React from "react"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthentication } = useAuth()
    if (!isAuthentication) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute