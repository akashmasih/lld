import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 4 * 1000,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

api.interceptors.request.use((req) => {
    return req
},
    (error) => {

        return Promise.reject(error);
    },
)
api.interceptors.response.use((res) => {
    return res
},
    (error) => {
        return Promise.reject(error);
    }
)

export default api



