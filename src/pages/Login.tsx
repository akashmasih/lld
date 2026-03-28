import { useAuth } from "../hooks/useAuth"
import Input from "../form/Input"
import useForm from "../hooks/useForm"
import type { ApiError, LoginBody, LoginResponse } from "../types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { login } from "../api/auth.api"
import type { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { Link } from "react-router"

function Login() {
    const { login: afterLogin } = useAuth()
    const { mutateAsync: onLogin } = useMutation({
        mutationFn: (data: LoginBody) => login(data),
        onSuccess: (data: AxiosResponse<LoginResponse>) => {
            afterLogin(data.data.data)
            toast.success("Login Successfully")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data?.message)
        }
    })
    const { register, handleSubmit } = useForm<LoginBody>({
        defaultValues: {
            email: '',
            password: ''
        }
    })


    const submit = (data: LoginBody) => {
        onLogin(data)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(submit)}>
                <Input label="Email" type="email" {...register('email')} />
                <Input label="Password" type="password" {...register('password')} />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Don't have an account? Register</Link>
        </div>
    )
}

export default Login