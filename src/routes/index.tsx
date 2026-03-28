import { createBrowserRouter, Outlet } from "react-router";
import RootLayout from "../layouts/RootLayout";
import About from "../pages/About";
import UserForm from "../pages/UserForm";
import '../App.css'
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PublicRoute from "../middleware/PublicRoute";
import ProtectedRoute from "../middleware/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute> <RootLayout /></ProtectedRoute>,
        children: [
            { index: true, Component: Dashboard },
            { path: 'about', Component: About },
            { path: 'user-form', Component: UserForm },
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