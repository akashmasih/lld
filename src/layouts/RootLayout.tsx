import { Outlet } from "react-router"

function RootLayout() {
    return (
        <div>
            <header>Root Header</header>
            <Outlet />
            <footer>Root Footer</footer>
        </div>
    )
}

export default RootLayout