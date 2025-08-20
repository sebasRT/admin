import { ThemedText } from "@/components/ThemedText";
import { BaseBarcodeProduct } from "@/model/products/barcode";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import ProductImage from "../Image";

// formulario de creacion a partir de producto base (global)
const NewFromBase = ({
  defaultValues,
}: {
  defaultValues: BaseBarcodeProduct;
}) => {
  const { image, name } = defaultValues;
  const form = useForm({ defaultValues });

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ThemedText children={"Nuevo"} style={{ backgroundColor: "red" }} />
      <ProductImage img={image} width={200} />
      <ThemedText children={name} style={{ backgroundColor: "red" }} />
    </View>
  );
};

export default NewFromBase;
