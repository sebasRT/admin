import axios from 'axios';

const API_BASE_URL = "https://midomi.app/api/admin"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function generateOtp(email: string) {
    try {
        await api.post(`/auth`, { email });
        return { succes: true };
    }
    catch (error: any) {
        console.log(error.response.data);

        const status = error.response.status;
        switch (status) {
            case 401 | 400:
                return { succes: false, error: "Correo invalido" };
            default:
                return { succes: false, error: "Error enviando OTP" };
        }
    }
}

export const verifyOtp = async (email: string, otp: number) => {

    try {
        const response = await api.post('/auth', { email, otp });
        console.log(response.status);

        return { success: true, token: response.data };
    } catch (error: any) {
        console.error(error.response.data);

        const status = error.response.status;
        switch (status) {
            case 401:
                return { succes: false, error: "OTP invalido" };
            default:
                return { succes: false, error: "Error enviando OTP" };
        }
    }

}