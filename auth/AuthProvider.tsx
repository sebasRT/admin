import { api } from "@/lib/api/domers";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { check, login, logout } from "./actions";
import { generateOtp, verifyOtp } from "./authApi";

type DecodedToken = {
  role: string;
  db_name: string;
  iat: number;
  exp: number;
};

type AuthState = {
  token: string | null;
  user: DecodedToken | null;
  hasOtp: boolean;
  isLoggedIn: boolean;
  isReady: boolean;
  isLoading: boolean;
  logIn: (email: string, otp: number) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  check: () => void;
  logOut: () => void;
};

const AuthContext = createContext<StoreApi<AuthState> | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [store] = useState(
    createStore<AuthState>((set) => ({
      token: null,
      isLoggedIn: false,
      isReady: false,
      hasOtp: false,
      isLoading: false,
      user: null,
      sendOtp: async (email: string) => {
        set({ isLoading: true });

        if (process.env.NODE_ENV === "development") {
          set({ hasOtp: true, isLoading: false });
          return;
        }

        const { succes, error } = await generateOtp(email);
        if (!succes) {
          set({ isLoading: false });
          throw new Error(error);
        }

        set({ hasOtp: succes, isLoading: false });
      },
      logIn: async (email: string, otp: number) => {
        set({ isLoading: true });
        const { success, token, error } = await verifyOtp(email, otp);

        if (!success || !token) {
          set({ isLoading: false });
          throw new Error(error);
        }

        await login(token);
        const user = jwtDecode<DecodedToken>(token);
        router.replace("/(protected)/(tabs)");
        
        set({
          token,
          user,
          isLoggedIn: success,
          isReady: true,
          isLoading: false,
        });
      },
      check: async () => {
        const token = check(); // Obtiene el token

        if (!token) {
          set({ isReady: true });
          return;
        }
        const user = jwtDecode<DecodedToken>(token);
        set({ token, user, isLoggedIn: !!token, isReady: true });
      },

      logOut: async () => {
        await logout(); // Elimina el token
        set({ token: null, user: null, isLoggedIn: false, isReady: true, hasOtp: false, isLoading: false });
        router.replace("/login");
      },
    }))
  );

  useEffect(() => {
    store.getState().check();
    const unsubscribe = store.subscribe((state) => {
      const token = state.token;

      const interceptorId = api.interceptors.request.use((config) => {
        config.headers = config.headers || {};
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      return () => {
        api.interceptors.request.eject(interceptorId);
      };
    });

    return unsubscribe;
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
