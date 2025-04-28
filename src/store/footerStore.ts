import { create } from "zustand";
interface FooterState {
  isRenderFooter: boolean;
  initFooter: () => void;
}

export const useFooterStore = create<FooterState>((set) => ({
  isRenderFooter: false,

  initFooter: () => {
    setTimeout(() => {
      set({ isRenderFooter: true });
    }, 500);
  },
}));
