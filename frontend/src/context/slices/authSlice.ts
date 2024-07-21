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
}

export const createAuthSlice: StateCreator<AuthState> = (set, get, store) => ({
  user: JSON.parse(Stringer(localStorage.getItem("user"))) || false,
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
});
