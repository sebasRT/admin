import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@react-navigation/elements";
import { Text, View } from "react-native";

export default function Index() {
  const {logOut} = useAuth((state) => state);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button onPressIn={logOut} >
        log out
      </Button>
    </View>
  );
}
