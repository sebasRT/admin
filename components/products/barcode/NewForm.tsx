import { BaseBarcodeProduct } from "@/model/products/barcode";
import { useForm } from "react-hook-form";
import { View } from "react-native";

// formulario de creacion a partir de producto base (global)
const NewFromBase = ({
  defaultValues,
}: {
  defaultValues: BaseBarcodeProduct;
}) => {
  const form = useForm({ defaultValues });

  return <View></View>;
};

export default NewFromBase;
