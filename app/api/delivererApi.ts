import { Deliverer } from '@/store/delivererStore';
import axios from 'axios';


const API_BASE_URL = "https://midomi.app/api/admin"

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const getDeliverers = async () => {
    try {
        const response = await api.get('/domers');
        return response.data;
    } catch (error) {
        console.error("Error fetching deliverers:", error);
        throw error;
    }
}

export const createDeliverer = async (deliverer: Deliverer) => {
    try {
        const response = await api.post('/domers', deliverer);
        return response.data;
    } catch (error) {
        console.error("Error creating deliverer:", error);
        throw error;
    }
}

