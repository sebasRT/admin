import { ThemedText } from "@/components/ThemedText";
import { BarcodeProduct } from "@/model/products/barcode";
import { View } from "react-native";
import ProductImage from "../Image";

const BarcodeCard = ({ product }: { product: BarcodeProduct }) => {
  const { name, price, image } = product;

  return (
    <View>
      <ProductImage img={image} />
      <ThemedText>{name}</ThemedText>
      <ThemedText>{price}</ThemedText>
    </View>
  );
};

export default BarcodeCard;
