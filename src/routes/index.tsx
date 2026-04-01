import { createBrowserRouter, Outlet } from "react-router";
import RootLayout from "../shared/layouts/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PublicRoute from "../shared/hoc/PublicRoute";
import ProtectedRoute from "../shared/hoc/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute> <RootLayout /></ProtectedRoute>,
        children: [
            { index: true, Component: Dashboard },
        ],
    },
    {
        path: 'login',
        element: <PublicRoute><Login /></PublicRoute>
    },
    {
        path: 'register',
        element: <PublicRoute><Register /></PublicRoute>
    }
])