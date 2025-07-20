import { useThemeColor } from "@/hooks/useThemeColor";
import { getDelivererJWT } from "@/lib/api/domers";
import { Deliverer } from "@/store/delivererStore";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const DomerModal = ({
  domer,
  isOpen,
  close,
}: {
  domer: Deliverer;
  isOpen: boolean;
  close: () => void;
}) => {
  const backgroundColor = useThemeColor({}, "background");
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      const jwt = await getDelivererJWT(domer.id);
      setToken(jwt);
    })();
  }, []);

  return (
    <Modal
      visible={isOpen}
      onRequestClose={close}
      animationType="fade"
      transparent={true}
    >
      <Pressable onPress={close} style={[styles.layer, { backgroundColor }]} />

      <ThemedView style={styles.modalContent}>
        {/* Render the domer's details */}
        <Image
          source={`https://api.qrserver.com/v1/create-qr-code/?data=${token}&format=svg`}
          style={styles.qrCode}
        />
        <ThemedText>Name: {domer.name}</ThemedText>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  qrCode: {
    width: 250,
    height: 250,
  },
  layer: {
    position: "absolute",
    inset: 0,
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 10,
    flexDirection: "column",
    margin: "auto",
    borderColor: "gray",
    borderWidth: 1,
  },
});
export default DomerModal;
