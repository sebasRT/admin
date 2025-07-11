import axios from 'axios';

const API_BASE_URL = "https://midomi.app/api/admin"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const generateOtp = async (email: string) => {

    return api.post('/auth', { email: email })

};

export const verifyOtp = async (email: string, otp: number) => {
    
    return api.post('/auth', { email: email, otp: otp });
}