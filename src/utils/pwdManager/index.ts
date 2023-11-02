//@ts-nocheck
import create from "zustand";
import { devtools } from "zustand/middleware";

interface PwdManagerState {
  password: string;
  setPassword: (value: string) => void;
}

export const useStore = create<PwdManagerState>(
  devtools((set, get) => ({
    password: null,
    setPassword: (value: string) => {
      set(() => ({ password: value }));
    },
  }))
);
