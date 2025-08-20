import { cld } from "@/lib/cloudinary";
import { DimensionValue, Image } from "react-native";
import { ThemedView } from "../ThemedView";

const ProductImage = ({
  img,
  width = "100%",
}: {
  img: string;
  width: DimensionValue;
}) => {
  const cldProductImage = cld.image(img).toURL();

  if (!cldProductImage) {
    return null; // Handle the case where the image URL is not available
  }

  return (
    <ThemedView
      style={{
        width,
        aspectRatio: 1,
      }}
    >
      <Image
        source={{ uri: cldProductImage }}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 10,
          resizeMode: "cover",
          objectFit: "cover",
        }}
      />
    </ThemedView>
  );
};

export default ProductImage;
