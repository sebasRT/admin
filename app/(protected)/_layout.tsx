import { useAuth } from "@/auth/AuthProvider";
import { ThemedText } from "@/components/ThemedText";
import { useNetworkState } from "expo-network";
import { Link, Redirect } from "expo-router";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ProtectedLayout = () => {
  const insets = useSafeAreaInsets()
  const { isConnected } = useNetworkState();
  const {isLoggedIn} = useAuth((state) => state);

  const showToast = () => {
    Toast.show({
      type: "noInternet",
      autoHide: false,
    });
  };

  useEffect(() => {
    if (isConnected) {
      return Toast.hide();
    }
    if (!isConnected) {
      showToast();
    }
  }, [isConnected]);

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />;
  }
  return (
    <ThemedText style={{ paddingTop: insets.top }}>
      <Link href={"/login"}>go to login</Link>
    </ThemedText>
  );
};

export default ProtectedLayout;
