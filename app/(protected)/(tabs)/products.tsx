import Barcode from "@/components/products/views/Barcode";
import Charts from "@/components/products/views/Charts";
import List from "@/components/products/views/List";
import Scanner from "@/components/products/views/Scanner";
import { ThemedView } from "@/components/ThemedView";
import useProductsPage, {
  useProductsPageStatus,
} from "@/hooks/useProductsPage";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getProductsByQuery } from "@/lib/api/products";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export default function Products() {
  return (
    <ThemedView style={{ flex: 1, gap: 20 }}>
      <Input />
      <ProductsPageView />
    </ThemedView>
  );
}

const ProductsPageView = () => {
  const status = useProductsPageStatus();

  switch (status) {
    case "barcode":
      return <Barcode />;
    case "query":
      return <List />;
    case "default":
      return <Charts />;
    case "scanning":
      return <Scanner />;
  }
};

const Input = () => {
  const iconColor = useThemeColor({}, "icon");
  const {
    query,
    setQuery,
    setBarcodeProducts,
    setFruverProducts,
    setScanning,
  } = useProductsPage();
  const onSearch = async () => {
    const { barcode, fruver } = await getProductsByQuery(query);
    setBarcodeProducts(barcode);
    setFruverProducts(fruver);
  };

  const color = useThemeColor({}, "tint");
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="Buscar producto"
        style={[styles.input, { color }]}
        onChangeText={setQuery}
        value={query}
        placeholderTextColor={"gray"}
        onSubmitEditing={() => onSearch()}
        returnKeyType="search"
      />
      <Pressable onPress={() => setScanning(true)} style={styles.button}>
        <Ionicons name="barcode-outline" size={50} color={iconColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    flex: 1,
    alignSelf: "center",
  },
  button: {
    paddingHorizontal: 10,
  },
});
