import axios from 'axios';
import { useDelivererStore } from '@/store/delivererStore';
import { Deliverer } from '@/store/delivererStore';


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

export const createDeliverer = async (deliverer: Deliverer) => {
    try {
        const response = await api.post('/admin', deliverer);
        return response.data;
    } catch (error) {
        console.error("Error creating deliverer:", error);
        throw error;
    }
}

