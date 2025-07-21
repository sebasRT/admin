import { createDeliverer, deleteDeliverer, getDeliverers } from "@/lib/api/domers";
import { create } from "zustand";

export type Deliverer = {
    id: string;
    email: string;
    name: string;
    phone: number;
    status: string;
}

type DelivererState = {
    deliverers: Deliverer[];
    isLoading: boolean;
    error:string | null;
    fetchDeliverers: () => Promise<void>;
    addDeliverer: (deliverer: Deliverer) => void;
    updateDeliverer: (name: string, updatedDeliverer: Partial<Deliverer>) => void;
    deleteDeliverer: (id: string) => void;
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
            
            // Esperar un poco antes de actualizar el estado
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            set((state) => ({
                deliverers: [...state.deliverers, newDeliverer],
                isLoading: false,
            }));
            console.log("Deliverer created successfully:", newDeliverer);
            
            // Refrescar la lista desde el servidor para asegurar consistencia
            const { fetchDeliverers } = get();
            await fetchDeliverers();
            
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
    deleteDeliverer: (id: string) => {
        set({isLoading: true, error: null});
        try {
            deleteDeliverer(id).then(() => {
                set((state) => ({
                    deliverers: state.deliverers.filter((deliverer) => deliverer.id !== id),
                    isLoading: false,
                }));
                console.log("Deliverer deleted successfully");
            });
        } catch (error) {
            console.error("Error deleting deliverer:", error);
            set({isLoading: false, error: "Failed to delete deliverer"});
        }
    },
    clearError: () => {
        set({error: null});
    },
}));
