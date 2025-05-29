import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function NoInternetToast() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>Sin conexión</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "red",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
  },
});
