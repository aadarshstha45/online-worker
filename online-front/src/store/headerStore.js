import { create } from "zustand";

export const useStoreHeaderData = create((set) => ({
  headerData: undefined,
  setHeaderData: (headerData) => set((state) => ({ ...state, headerData })),
}));
