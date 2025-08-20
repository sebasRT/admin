import { BarcodeProduct, barcodeSchema, NewBarcodeProduct, newBarcodeSchema } from "@/model/products/barcode";
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
    const parsedProduct = newBarcodeSchema.safeParse(product)

    if (!parsedProduct.success) {
        console.error("Invalid barcode product:", parsedProduct.error);
        throw new Error("Invalid barcode product");
    }

    try {
        const response = await api.post('/products/barcode/new', { ...product, price: Number(product.price) })
        return response.data;
    } catch (error: any) {
        console.log(error.response.data);
        throw error;
    }
}


/**
 * Add barcode product FOUND IN GLOBAL STORE.
 * @param product - The new barcode product to be created with all the values required to be shown in ecommerce.
 */
async function addProduct(product: BarcodeProduct) {
    const { name, price, image, measure } = product;
    console.log(name, price, measure);

    const parsedProduct = barcodeSchema.safeParse(product);

    if (!parsedProduct.success) {
        console.error("Invalid barcode product:", parsedProduct.error);
        throw new Error("Invalid barcode product");
    }

    try {
        const response = await api.post(`/products/barcode`, parsedProduct.data);
        console.log(response.data);

        return response.data;

    } catch (error: any) {
        console.error("Error adding product:", JSON.stringify(error.response.data));
        throw error;
    }
}
export { addProduct, getProductByBarcode, getProductsByQuery, postNewProduct };

