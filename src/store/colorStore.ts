import { create } from "zustand";

// Interface untuk state warna
interface ColorState {
  currentColor: string; // Original - for predefined colors
  customCurrentColor: string; // New - for custom colors
  colors: string[];
  setColor: (index: number) => void;
  setCustomColor: (hexColor: string) => void; // New setter for custom colors
}

// Membuat store untuk warna
const useColorStore = create<ColorState>((set) => ({
  // Warna default (index 0)
  currentColor: "#C9D9E3",
  // Default custom color
  customCurrentColor: "#C9D9E3",

  // Daftar warna berdasarkan index
  colors: [
    "#C9D9E3", // Warna default
    "#E3C9D9", // Warna untuk index 1
    "#D9E3C9", // Warna untuk index 2
    "#C9E3D9", // Warna untuk index 3
    "#F9EFED", // Warna untuk index 4 (ivory-blush)
  ],

  // Fungsi untuk mengubah warna berdasarkan index
  setColor: (index: number) =>
    set((state) => ({
      currentColor: state.colors[index] || state.colors[0],
    })),

  // Fungsi baru untuk mengatur warna kustom
  setCustomColor: (hexColor: string) =>
    set(() => ({
      customCurrentColor: hexColor,
    })),
}));

export default useColorStore;
