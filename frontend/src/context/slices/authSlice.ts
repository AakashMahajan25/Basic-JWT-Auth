import axios from "axios";
import { StateCreator } from "zustand";

const Stringer = (data: string | null): string => {
  if (data == null) {
    return "";
  }
  return data;
};

export interface AuthState {
  user:
    | {
        accessToken: string;
      }
    | false;
  login: (userData: { accessToken: string }) => void;
  logout: () => void;
  validateToken: () => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthState> = (set, get, store) => ({
  user: (() => {
    const userString = Stringer(localStorage.getItem("user"));
    try {
      return userString ? JSON.parse(userString) : false;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return false; // Fallback to false if parsing fails
    }
  })(),
  login: (userData: { accessToken: string }) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({
      user: false,
    });
  },
  validateToken: async () => {
    const user = (() => {
      const userString = Stringer(localStorage.getItem("user"));
      try {
        return userString ? JSON.parse(userString) : false;
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return false; // Fallback to false if parsing fails
      }
    })();

    if (user && user.accessToken) {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/v1/validate-token",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        if (response.status === 200 && response.data.valid) {
          set({ user });
        } else {
          set({ user: false });
          localStorage.removeItem("user");
          console.log("Token Invalid!");
        }
      } catch (error) {
        console.error("Error validating token", error);
        set({ user: false });
      }
    } else {
      set({ user: false });
    }
  },
});
