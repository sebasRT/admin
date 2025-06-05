import axios from 'axios';

const API_BASE_URL = "https://nestjs-multitenant-backend-ccrf.onrender.com/"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const generateOtp = async(email:string) => {

    return api.post('/auth/generate-otp', { email: email })

};