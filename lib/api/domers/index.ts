import { Deliverer } from '@/store/delivererStore';
import * as SecureStore from "expo-secure-store";
import api from '../delivererApi';


api.defaults.headers.common['Authorization'] = `Bearer ${SecureStore.getItem('token')}`;

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

export const getDelivererJWT = async (id: string) => {
    try {
        const response = await api.get(`/domers/${id}/jwt`);
        return response.data;
    } catch (error) {
        console.error("Error fetching JWT:", error);
        throw error;
    }
}