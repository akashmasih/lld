import { Outlet } from 'react-router'

function AuthLayout() {
    return (
        <div>
            <header>Auth Head</header>
            <Outlet />
            <footer>Auth Footer</footer>
        </div>
    )
}

export default AuthLayout