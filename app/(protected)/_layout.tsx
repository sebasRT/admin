import { useAuth } from "@/auth/AuthProvider";
import { useNetworkState } from "expo-network";
import { Redirect, Slot } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const ProtectedLayout = () => {
  const { isConnected } = useNetworkState();
  const { isLoggedIn, isReady } = useAuth((state) => state);

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

  if (!isReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />;
  }
  return (
    <>
      <Slot />
    </>
  );
};

export default ProtectedLayout;
