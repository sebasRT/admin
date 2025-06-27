import {create} from "zustand";
import {getDeliverers} from "@/app/api/delivererApi";

export type Deliverer = {
    email: string;
    name: string;
    phone: string;
    db: string; 
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
            const deliverers = await getDeliverers();
            set({deliverers, isLoading: false});
        } catch (error) {
            console.error("Error fetching deliverers:", error);
            set({isLoading: false, error: "Failed to fetch deliverers"});
        }
    },
    addDeliverer: (deliverer) => {
        set((state) => ({
            deliverers: [...state.deliverers, deliverer],
        }));
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
