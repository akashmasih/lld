import api from "../../../lib/api";
import type { LoginBody, RegisterBody } from "../types/auth.types";

function login(data: LoginBody) {
    return api.post('/auth/login', data)
}

function register(data: RegisterBody) {
    return api.post('/auth/register', data)
}

function refresh() {
    return api.post('/auth/refresh', { refreshToken: localStorage.getItem('refreshToken') })
}

function logout() {
    return api.post('/auth/logout', { refreshToken: localStorage.getItem('refreshToken') })
}

export { login, register, refresh, logout }
