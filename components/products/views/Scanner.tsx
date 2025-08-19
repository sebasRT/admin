import useProductsPage from "@/hooks/useProductsPage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Stack } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const { setBarcode } = useProductsPage();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission();
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos acceso a la cámara para escanear códigos de barras.
        </Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Scanner", headerShown: false }} />
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }}
        style={{ width: 250, height: 250, alignSelf: "center" }}
        ratio="1:1"
        facing="back"
        active={true}
        onBarcodeScanned={(e) => setBarcode(e.data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    justifyContent: "center",
    width: "auto",
    flexGrow: 1,
  },
  message: {
    borderRadius: 99,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    backgroundColor: "rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "white",
  },
});
export default Scanner;
