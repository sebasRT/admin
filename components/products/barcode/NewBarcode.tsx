import { ThemedText } from "@/components/ThemedText";

const NewBarcode = ({ barcode }: { barcode: string }) => {
  return <ThemedText>creando nuevo producto: {barcode}</ThemedText>;
};

export default NewBarcode;
