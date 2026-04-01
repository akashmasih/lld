
import { register as registerApi } from "../features/auth/api/auth.api"
import { useAuth } from "../shared/hooks/useAuth"
import Input from "../shared/ui/Input"
import useForm from "../shared/hooks/useForm"
import type { LoginResponse, RegisterBody, RegisterResponseError } from "../features/auth/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { motion } from 'motion/react';
import { Link } from "react-router"
import { ArrowRight, Zap } from 'lucide-react'
import Button from "../shared/ui/Button"


function Register() {
    const { register, handleSubmit, errors, setErrors } = useForm<RegisterBody>({
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    })
    const { login: afterLogin } = useAuth()
    const { mutateAsync: onLogin, isPending } = useMutation({
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

        <div className="flex h-screen ">
            {/* start of Left Side */}
            <div className="relative gradient-primary flex-col w-1/2 p-12 justify-between overflow-hidden  hidden lg:flex">
                {/* Decorative */}
                <motion.div
                    animate={{ y: [0, -5, 0], x: [0, 5, -5, 0] }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}

                    className="absolute right-[-10%] top-[-10%] bg-amber-50 h-80 w-80 rounded-full opacity-10" />
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}

                    className="absolute left-[-10%] bottom-[-10%] bg-amber-50 h-80 w-80 rounded-full opacity-10" />
                <motion.div
                    animate={{ y: [0, -5, 0], x: [0, 5, -5, 0] }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}

                    className="absolute left-[50%] top-[50%] translate-[-50%] bg-amber-50 h-96 w-96 rounded-full opacity-10" />

                {/* Logo */}
                <div className="flex relative gap-2 items-center">
                    <span className="bg-white/20 rounded-sm backdrop-blur-sm p-2">
                        <Zap color="white" size={20} />
                    </span>
                    <span className="text-2xl font-bold text-primary-foreground">SubTrackr</span>
                </div>

                {/* content center */}
                {/* Center content */}
                <div className="relative z-10 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 10 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-white font-bold" style={{ fontSize: '2.5rem', lineHeight: '1.2', fontFamily: 'Poppins, sans-serif' }}>
                            Track every penny,<br />own every moment.
                        </h1>
                        <p className="text-white/70 mt-4 text-lg leading-relaxed">
                            Your subscriptions, expenses, and financial insights—all in one beautiful place.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex gap-8"
                    >
                        {[
                            { value: '12K+', label: 'Active Users' },
                            { value: '$2M+', label: 'Tracked Monthly' },
                            { value: '4.9★', label: 'App Rating' },
                        ].map(stat => (
                            <div key={stat.label}>
                                <div className="text-white font-bold text-2xl">{stat.value}</div>
                                <div className="text-white/60 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-5"
                >
                    <p className="text-white/90 text-sm italic leading-relaxed">
                        "SubTrackr helped me discover I was paying for 6 services I forgot about. Saved me $80/month instantly!"
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                        <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-sm font-bold">S</div>
                        <div>
                            <p className="text-white text-sm font-medium">Sarah Kim</p>
                            <p className="text-white/60 text-xs">Product Designer</p>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* End of Left Side */}

            {/* Main Login Form */}

            <div className="relative  bg-background px-10 lg:px-40 py-8 lg:py-40 flex-1">
                {/* Decorative */}
                <h1 className="text-3xl font-bold mb-3">Welcome Back 👋</h1>
                <p className="text-foreground-light text-sm mb-8">Sign in to your account to continue</p>
                <form onSubmit={handleSubmit(submit)} className="space-y-4">
                    <Input error={errors?.name?.message} label="Full Name" placeholder="Enter your name" type="text" {...register('name')} />
                    <Input error={errors?.email?.message} label="Email" type="email" placeholder="Enter your Email" {...register('email')} />
                    <Input error={errors?.password?.message} label="Password" placeholder="Enter your Password" type="password" {...register('password')} />
                    <p className="text-foreground-light text-sm"><Link to="/login">Forgot Password </Link></p>
                    <Button isLoading={isPending} className="w-full">Sign In<ArrowRight size={18} /></Button>
                    <p className=" text-center text-foreground-light text-sm">Don't have an account? <Link className="font-semibold" to="/register">Sign up free?</Link></p>
                </form>
            </div>


        </div>
    )
}

export default Register