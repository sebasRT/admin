import AuthProvider from "@/auth/AuthProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(protected)"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" options={{ animation: "none" }} />
      </Stack>
    </AuthProvider>
  );
}
