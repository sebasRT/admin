import { BarcodeProduct, NewBarcodeProduct } from "@/model/products/barcode";
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


/**
 * Posts NOT FOUND IN GLOBAL STORE product.
 * 
 * @param product - The new barcode product to be created with ( name , brand and measure only).
 */
async function postNewProduct(product: NewBarcodeProduct) {

    const response = await api.post('/products/barcode/new', { ...product, price: Number(product.price) })
    return response.data;
}


/**
 * Add barcode product FOUND IN GLOBAL STORE.
 * @param product - The new barcode product to be created with all the values required to be shown in ecommerce.
 */
async function addProduct(product: BarcodeProduct) {
    const response = await api.post(`/products/barcode`, product);
    return response.data;
}
export { addProduct, getProductByBarcode, getProductsByQuery, postNewProduct };

