import axios from 'axios';

const API_BASE_URL = "https://nestjs-multitenant-backend-ccrf.onrender.com/"

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const getDeliverers = async () => {
    try {
        const response = await api.get('/admin/sendero_verde');
        return response.data;
    } catch (error) {
        console.error("Error fetching deliverers:", error);
        throw error;
    }
}
