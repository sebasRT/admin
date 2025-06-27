import * as SecureStore from "expo-secure-store";

export async function check(): Promise<string | null> {
  return await SecureStore.getItemAsync("token"); // Retorna el token o null
}

export async function login(token: string): Promise<void> {
  await SecureStore.setItemAsync("token", token);
}

export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync("token");
}