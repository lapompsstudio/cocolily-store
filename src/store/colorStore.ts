// store/colorStore.ts
import { create } from "zustand";

// Interface untuk state warna
interface ColorState {
  currentColor: string;
  colors: string[];
  setColor: (index: number) => void;
}

// Membuat store untuk warna
const useColorStore = create<ColorState>((set) => ({
  // Warna default (index 0)
  currentColor: "#C9D9E3",

  // Daftar warna berdasarkan index
  colors: [
    "#C9D9E3", // Warna default
    "#E3C9D9", // Warna untuk index 1
    "#D9E3C9", // Warna untuk index 2
    "#C9E3D9", // Warna untuk index 3
    "#F9EFED",
  ],

  // Fungsi untuk mengubah warna berdasarkan index
  setColor: (index: number) =>
    set((state) => ({
      currentColor: state.colors[index] || state.colors[0],
    })),
}));

export default useColorStore;
