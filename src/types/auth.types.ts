
export interface LoginResponse {
    data: LoginResponseData,
    message: string;
    success: boolean;
}

export interface LoginResponseData {
    tokens: Tokens
    user: User
}

export type Tokens = {
    accessToken: string
    refreshToken: string
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
    login: (data: LoginResponseData) => void,
    logout: () => void,
    isAuthentication: boolean
}

export type RegisterBody = {
    name: string
    email: string
    password: string
}

export type LoginBody = {
    email: string
    password: string
}

export interface ApiError {
    message: string,
    success: boolean,
}

export interface ValidationErrors {
    _errors?: string[];
    body?: {
        _errors?: string[];
        [key: string]: {
            _errors: string[];
        } | any;
    };
}

export interface RegisterResponseError {
    message: string,
    success: boolean,
    data: ValidationErrors | null;
}

