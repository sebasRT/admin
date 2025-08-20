import { ThemedText } from "@/components/ThemedText";
import useProductsPage from "@/hooks/useProductsPage";
import { getProductByBarcode } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import BarcodeCard from "../barcode/Card";
import NewBarcode from "../barcode/NewBarcode";
import NewFromBase from "../barcode/NewFromBase";

const BarcodeProductView = () => {
  const { barcode } = useProductsPage();
  if (!barcode) return null;

  const { data, isLoading } = useQuery({
    queryKey: ["products", barcode],
    queryFn: () => getProductByBarcode(barcode),
    retry: false,
  });

  if (isLoading) {
    return <ThemedText>Cargando producto...</ThemedText>;
  }

  if (!data) {
    return <NewBarcode barcode={barcode} />;
  }

  return data.inStore ? (
    <BarcodeCard product={data} />
  ) : (
    <NewFromBase defaultValues={data} />
  );
};

export default BarcodeProductView;
