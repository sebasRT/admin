import { BarcodeProduct } from "@/model/products/barcode";
import { FruverProduct } from "@/model/products/fruver";
import * as SecureStore from "expo-secure-store";
import api from "../delivererApi";


api.defaults.headers.common['Authorization'] = `Bearer ${SecureStore.getItem('token')}`;

async function getProductsByQuery(query: string) {

    const [fruver, barcode] = await Promise.all([
        api.get(`/products/fruver/search/${decodeURIComponent(query)}`),
        api.get(`/products/barcode/search/${decodeURIComponent(query)}`)
    ]);

    return { fruver: fruver.data as FruverProduct[], barcode: barcode.data as BarcodeProduct[] };
}

async function getProductByBarcode(barcode: string) {
    const response = await api.get(`/products/barcode/${barcode}`);
    return response.data as BarcodeProduct & { inStore: boolean };
}

export { getProductByBarcode, getProductsByQuery };

