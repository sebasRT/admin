import { createDeliverer, getDeliverers } from "@/app/api/delivererApi";
import { create } from "zustand";

export type Deliverer = {
    email: string;
    name: string;
    phone: number;
}

type DelivererState = {
    deliverers: Deliverer[];
    isLoading: boolean;
    error:string | null;
    fetchDeliverers: () => Promise<void>;
    addDeliverer: (deliverer: Deliverer) => void;
    updateDeliverer: (name: string, updatedDeliverer: Partial<Deliverer>) => void;
    deleteDeliverer: (email: string) => void;
    clearError: () => void;
};

export const useDelivererStore = create<DelivererState>((set,get)=>({
    deliverers: [],
    isLoading: false,
    error: null,

    fetchDeliverers: async () => {
        set({isLoading: true, error: null});
        try {
            const response = await getDeliverers();
            const deliverers = response.domers
            set({deliverers, isLoading: false});
        } catch (error) {
            console.error("Error fetching deliverers:", error);
            set({isLoading: false, error: "Failed to fetch deliverers"});
        }
    },
    
    addDeliverer: async (deliverer) => {
        set({isLoading: true, error: null});
        try {
            const newDeliverer = await createDeliverer(deliverer);
            set((state) => ({
                deliverers: [...state.deliverers, newDeliverer],
                isLoading: false,
            }));
            console.log("Deliverer created successfully:", newDeliverer);
        } catch (error) {
            console.error("Error creating deliverer:", error);
            set({isLoading: false, error: "Failed to create deliverer"});
        }
    },
    updateDeliverer: (name, updatedDeliverer) => {
        set((state) => ({
            deliverers: state.deliverers.map((deliverer) =>
                deliverer.name === name ? {...deliverer, ...updatedDeliverer} : deliverer
            ),
        }));
    },
    deleteDeliverer: (email) => {
        set((state) => ({
            deliverers: state.deliverers.filter((deliverer) => deliverer.email !== email),
        }));
    },
    clearError: () => {
        set({error: null});
    },
}));
