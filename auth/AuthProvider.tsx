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
}

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
        set(() => ({ isLoading: true }));
        try {
          const response = await generateOtp(email);
          set(() => ({ hasOtp: true, isLoading: false }));

          return response.data;
        }
        catch (error) {
          console.error("Error fetching OTP:", error);
        }
      },
      logIn: async (email: string, otp: number) => {
        set({ isLoading: true });
        try {
          const response = await verifyOtp(email, otp);
          console.log("OTP verification response:", response);
          const token = response.data;
          const user = jwtDecode<DecodedToken>(token);
          await login(token);
          set({ token, user, isLoggedIn: true, isReady: true });
          router.replace("/(protected)/(tabs)");
        } catch (error) {
          console.error("OTP verification failed:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      check: () => {
        const token = check(); // Obtiene el token
        const user = token ? jwtDecode<DecodedToken>(token) : null;
        const isLoggedIn = !!token;
        set({ token, user, isLoggedIn, isReady: true });
      },

      logOut: async () => {
        await logout(); // Elimina el token
        set({ token: null, isLoggedIn: false });
        router.replace("/login");
      },

    }))
  );

  useEffect(() => {
    store.getState().check();
  }, [store]);

  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      const token = state.token;

      // Registrar interceptor y guardar su ID
      const interceptorId = api.interceptors.request.use((config) => {
        config.headers = config.headers || {};
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      // Función de limpieza para quitar el interceptor
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
