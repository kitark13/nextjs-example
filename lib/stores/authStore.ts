import { create } from "zustand";
import { User } from "../api/api";

type AutStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  cleareisAuthenticated: () => void;
};

export const useAuthStore = create<AutStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  cleareisAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
