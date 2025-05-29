import * as SecuredStore from "expo-secure-store";

function check() {
  const loggedIn = SecuredStore.getItem("loggedIn");
  if (loggedIn === "true") {
    return true;
  } else {
    return false;
  }
}

function login(token: string) {
  SecuredStore.setItem("loggedIn", "true");
  SecuredStore.setItem("token", token);
}

function logout() {
  SecuredStore.setItem("loggedIn", "false");
  SecuredStore.deleteItemAsync("loggedIn");
}

export { check, login, logout };

