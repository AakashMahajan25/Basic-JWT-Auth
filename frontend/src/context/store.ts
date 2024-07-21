import { create } from "zustand";
import { createAuthSlice, AuthState } from "./slices/authSlice";

export const useAuthStore = create<AuthState>((set, get, store) => ({
  ...createAuthSlice(set, get, store),
}));
