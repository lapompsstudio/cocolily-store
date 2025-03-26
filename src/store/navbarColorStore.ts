import { create } from "zustand";

interface NavbarColorState {
  isNavbarWhite: boolean;
  setIsNavbarWhite: (value: boolean) => void;
  toggleNavbarColor: () => void;
}

export const useNavbarColorStore = create<NavbarColorState>((set) => ({
  isNavbarWhite: false,
  setIsNavbarWhite: (value: boolean) => set({ isNavbarWhite: value }),
  toggleNavbarColor: () =>
    set((state) => ({ isNavbarWhite: !state.isNavbarWhite })),
}));
