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
import { generateOtp, verifyOtp } from "./authApi";

type AuthState = {
  hasOtp: boolean;
  isLoggedIn: boolean;
  isReady: boolean;
  isLoading: boolean;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
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
      hasOtp: false,
      isLoading: false,
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
      verifyOtp: async (email: string, otp: string) => {
        set({ isLoading: true });
        try {
          const response = await verifyOtp(email, otp); 
          const token = response.data.token;
          login(token); 
          set({ isLoggedIn: true, isReady: true });
          router.replace("/(protected)/(tabs)");
        } catch (error) {
          console.error("OTP verification failed:", error);
        } finally {
        set({ isLoading: false });
        }
      },

      check: () =>
        set(() => {
          const isLoggedIn = check(); // Replace with actual logic to check login status
          return { isLoggedIn, isReady: true };
        }),
      logIn: (token: string) =>
        set(() => {
          login(token);
          router.replace("/(protected)/(tabs)");
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
