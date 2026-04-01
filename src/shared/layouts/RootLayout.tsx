import { Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"

function RootLayout() {
    const { logout } = useAuth()
    return (
        <div>
            <header>
                <button onClick={logout}>Logout</button>
            </header>
            <Outlet />
            <footer>Root Footer</footer>
        </div>
    )
}

export default RootLayout