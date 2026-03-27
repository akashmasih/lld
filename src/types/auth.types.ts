export interface LoginResponse {
    user: User
    accessToken: string
    refreshToken: string
    expiresIn: number
}

export interface User {
    id: string
    name: string
    email: string
    role: string
}


export interface AuthContextTypes {
    user: User | undefined,
    token: string | undefined,
    login: (data: LoginResponse) => void,
    logout: () => void,
    isAuthentication: boolean
}