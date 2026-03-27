import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import UserForm from "../pages/UserForm";
import '../App.css'
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: 'about', Component: About },
            { path: 'user-form', Component: UserForm },
        ],

    },
    {
        path: 'admin',
        Component: AuthLayout,
        children: [
            { index: true, Component: Dashboard }
        ]
    }
])