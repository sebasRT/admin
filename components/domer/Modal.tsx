import { useThemeColor } from "@/hooks/useThemeColor";
import { getDelivererJWT } from "@/lib/api/domers";
import { Deliverer, useDelivererStore } from "@/store/delivererStore";
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
    if (!isOpen) return; // Solo ejecutar si el modal está abierto
    
    const fetchToken = async () => {
      try {
        // Agregar un pequeño delay para permitir que el servidor procese la creación
        await new Promise(resolve => setTimeout(resolve, 500));
        const jwt = await getDelivererJWT(domer.id);
        setToken(jwt);
      } catch (error) {
        console.error("Error fetching JWT:", error);
        // Reintentar después de un tiempo
        setTimeout(async () => {
          try {
            const jwt = await getDelivererJWT(domer.id);
            setToken(jwt);
          } catch (retryError) {
            console.error("Retry failed:", retryError);
          }
        }, 2000);
      }
    };

    fetchToken();
  }, [domer.id, isOpen]);

  const {deliverers, deleteDeliverer, fetchDeliverers, clearError} = useDelivererStore();

  const handleDelete = async () => {
    try{
      await deleteDeliverer(domer.id);
      close();
      alert("Domiciliario eliminado con éxito.");
      await fetchDeliverers();
    }
    catch (error) {
      console.error("Error deleting deliverer:", error);
      alert("Error al eliminar el domiciliario.");
    }
  }

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
        <ThemedView style={styles.actionsContainer}>
          <Pressable style={styles.editButton} onPress={close}>
            <ThemedText style={styles.editButtonText}>Editar</ThemedText>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <ThemedText style={styles.deleteButtonText}>Eliminar</ThemedText>
          </Pressable>
        </ThemedView>
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
  actionsContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,

  },
  deleteButton: {
    backgroundColor: "red",
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "blue",
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },

});
export default DomerModal;
