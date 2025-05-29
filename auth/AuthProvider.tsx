import { useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { check, login, logout } from "./actions";

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  check: () => void;
  logIn: (token: string) => void;
  logOut: () => void;
};

const AuthContext = createContext<StoreApi<AuthState> | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [store] = useState(
    createStore<AuthState>((set) => ({
      isLoggedIn: false,
      isReady: false,
      check: () =>
        set(() => {
          const isLoggedIn = check(); // Replace with actual logic to check login status
          return { isLoggedIn, isReady: true };
        }),
      logIn: (token: string) =>
        set(() => {
          login(token);
          router.replace("/");
          return { isLoggedIn: true, isReady: true };
        }),
      logOut: () =>
        set(() => {
          logout();
          router.replace("/login");
          return { isLoggedIn: false };
        }),
    }))
  );

  useEffect(() => {
    store.getState().check();
  }, [store]);

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export function useAuth<T>(
  selector: (state: AuthState) => T = (state) => state as T
): T {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useStore(context, selector);
}
export default AuthProvider;
