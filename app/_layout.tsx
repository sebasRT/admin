import AuthProvider from "@/auth/AuthProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const queryClient = new QueryClient();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(protected)"
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="login" options={{ animation: "none" }} />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
