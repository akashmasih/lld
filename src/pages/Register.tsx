import { useAuth } from "../hooks/useAuth"
import Input from "../form/Input"
import useForm from "../hooks/useForm"
import type { LoginResponse, RegisterBody, RegisterResponseError } from "../types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { register as registerApi } from "../api/auth.api"
import type { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { Link } from "react-router"

function Register() {
    const { register, handleSubmit, errors, setErrors } = useForm<RegisterBody>({
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    })
    const { login: afterLogin } = useAuth()
    const { mutateAsync: onLogin } = useMutation({
        mutationFn: (data: RegisterBody) => registerApi(data),
        onSuccess: (data: AxiosResponse<LoginResponse>) => {
            afterLogin(data.data.data)
            toast.success("Register Successfully")
        },
        onError: (error: AxiosError<RegisterResponseError>) => {
            const newError = error.response?.data?.data?.body

            if (!newError) {
                toast.error(error.response?.data?.message)
            }
            else {
                for (let key in newError) {
                    if (key !== "_errors") {
                        setErrors((prev) => ({
                            ...prev,
                            [key]: {
                                type: "required",
                                message: newError[key]._errors[0]
                            }
                        }))

                    }

                }
            }
        }
    })



    const submit = (data: RegisterBody) => {
        onLogin(data)
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(submit)}>
                <Input error={errors?.name?.message} label="Name" type="text" {...register('name')} />
                <Input error={errors?.email?.message} label="Email" type="email" {...register('email')} />
                <Input error={errors?.password?.message} label="Password" type="password" {...register('password')} />
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Already have an account? Login</Link>
        </div>
    )
}

export default Register