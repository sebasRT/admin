import { BarcodeProduct } from "@/model/products/barcode";
import { FruverProduct } from "@/model/products/fruver";
import { create } from "zustand";

type StoreProps = {
    query: string;
    barcode: string;
    scanning: boolean;
    setScanning: (scanning: boolean) => void;
    setBarcode: (barcode: string) => void;
    barcodeProduct: BarcodeProduct | null;
    setQuery: (query: string) => void;
    barcodeProducts: BarcodeProduct[];
    fruverProducts: FruverProduct[];
    setBarcodeProducts: (products: BarcodeProduct[]) => void;
    setFruverProducts: (products: FruverProduct[]) => void;
}

const useProductsPage = create<StoreProps>((set, get) => ({
    query: "",
    barcode: "",
    scanning: false,
    barcodeProduct: null,
    barcodeProducts: [],
    fruverProducts: [],
    setScanning: (scanning: boolean) => set({ scanning, barcode: "", query: "" }),
    setBarcode: (barcode: string) => set({ barcode, query: "", scanning: false }),
    setQuery: (query: string) => set({ query, barcode: "", scanning: false }),
    setBarcodeProducts: (products: BarcodeProduct[]) => set({ barcodeProducts: products }),
    setFruverProducts: (products: FruverProduct[]) => set({ fruverProducts: products }),
}))

const useProductsPageStatus = () => useProductsPage(state => state.query ? "query" : state.barcode ? "barcode" : state.scanning ? "scanning" : "default");

export { useProductsPageStatus };
export default useProductsPage;