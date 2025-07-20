import { useAuth } from "@/auth/AuthProvider";
import DelivererForm from "@/components/DelivererForm";
import { Deliverer, useDelivererStore } from "@/store/delivererStore";
import { Button } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type ItemProps = {
  deliverer: Deliverer;
  onEdit?: () => void;
  onDelete?: () => void;
  onQRCode?: () => void;
};

const Item = ({ deliverer, onEdit, onDelete, onQRCode }: ItemProps) => {
  const { name, phone } = deliverer;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Pressable onPress={() => setModalOpen(true)}>
      <DomerModal
        domer={deliverer}
        isOpen={modalOpen}
        close={() => setModalOpen(false)}
      />
      <View style={styles.item}>
        <Image
          style={styles.delivererImage}
          source={require("@/assets/images/deliverer.png")}
        />

        <View style={styles.delivererDetails}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phoneNumber}>{phone}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.qrContainer}>
            <Image
              style={styles.qrImage}
              source={require("@/assets/images/qr.png")}
              // onTouchEnd={onQRCode}
            />
          </View>
          <View style={styles.changeContainer}>
            <Image
              style={styles.editImage}
              source={require("@/assets/images/edit.png")}
              // onTouchEnd={onEdit}
            />
            <Image
              style={styles.deleteImage}
              source={require("@/assets/images/trash.png")}
              // onTouchEnd={onDelete}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default function Index() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { logOut } = useAuth((state) => state);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Use the deliverer store
  const {
    deliverers,
    isLoading,
    error,
    fetchDeliverers,
    deleteDeliverer,
    clearError,
  } = useDelivererStore();

  useEffect(() => {
    // Fetch deliverers when component mounts
    fetchDeliverers();
  }, [fetchDeliverers]);

  // Show error alert if there's an error
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        {
          text: "Retry",
          onPress: () => {
            clearError();
            fetchDeliverers();
          },
        },
        {
          text: "OK",
          onPress: clearError,
        },
      ]);
    }
  }, [error, clearError, fetchDeliverers]);

  const handleEdit = (delivererId: string) => {
    // Implement edit functionality
    console.log("Edit deliverer:", delivererId);
    // You can navigate to an edit screen or show a modal
  };

  const handleDelete = (delivererId: string, delivererName: string) => {
    Alert.alert(
      "Delete Deliverer",
      `Are you sure you want to delete ${delivererName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteDeliverer(delivererId),
        },
      ]
    );
  };

  const handleQRCode = (delivererId: string) => {
    // Implement QR code functionality
    console.log("Show QR code for deliverer:", delivererId);
    // You can navigate to a QR code screen or show a modal
  };

  // Show loading indicator
  if (isLoading && deliverers.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.centered]}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading deliverers...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Show empty state if no deliverers
  if (!isLoading && deliverers.length === 0 && !error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.centered]}>
          <Text style={styles.emptyText}>No deliverers found</Text>
          <Button onPress={fetchDeliverers}>Refresh</Button>
          <Button onPress={logOut}>Log out</Button>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={deliverers}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Item
              deliverer={item}
              onEdit={() => handleEdit(item.name)}
              onDelete={() => handleDelete(item.name, item.name)}
              onQRCode={() => handleQRCode(item.name)}
            />
          )}
          refreshing={isLoading}
          onRefresh={fetchDeliverers}
        />
        <Pressable style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Crear Domiciliario</Text>
        </Pressable>

        <DelivererForm
          visible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
            fetchDeliverers(); // Refresh the list after adding
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import DomerModal from "@/components/domer/Modal";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  item: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
    borderRadius: 10,
    marginVertical: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  delivererImage: {
    width: 60,
    margin: 15,
    height: 60,
    resizeMode: "contain",
  },
  qrImage: {
    margin: 15,
    resizeMode: "contain",
  },
  delivererDetails: {
    justifyContent: "center",
  },
  actionsContainer: {
    flex: 1,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  qrContainer: {
    justifyContent: "center",
  },
  phoneNumber: {
    fontSize: 17,
  },
  changeContainer: {
    justifyContent: "center",
    gap: 12,
  },
  editImage: {
    resizeMode: "contain",
  },
  deleteImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0067F6",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
