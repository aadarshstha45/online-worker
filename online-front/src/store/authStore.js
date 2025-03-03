import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Default user value
      setUser: (user) => set({ user }), // Action to set user details
      clearUser: () => set({ user: null }), // Action to clear user details
    }),
    {
      name: "user-storage", // Key to store in localStorage or sessionStorage
      getStorage: () => localStorage, // Using localStorage for persistence
    }
  )
);

export default useAuthStore;
