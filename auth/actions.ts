import * as SecureStore from "expo-secure-store";

export function check(){
  return SecureStore.getItem("token"); // Retorna el token o null
}

export async function login(token: string): Promise<void> {
  await SecureStore.setItemAsync("token", token);
}

export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync("token");
}