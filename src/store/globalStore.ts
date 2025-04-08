import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";

export interface Global {
  id: number;
  documentId: string;
  email: string;
  phone_number: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  social: Social[];
  address_location: string;
  address_url: string;
}

export interface Social {
  id: number;
  name: string;
  links: string;
}

type GlobalStoreType = {
  globalData: Global | null;
  isGlobalFetched: boolean;
  isLoading: boolean;
  error: Error | null;
  fetchGlobalData: () => Promise<void>;
};

export const globalStore = create<GlobalStoreType>((set) => ({
  globalData: null,
  isGlobalFetched: false,
  isLoading: false,
  error: null,
  fetchGlobalData: async () => {
    set((state) => {
      // Prevent fetching if already fetched or currently loading
      if (state.isGlobalFetched || state.isLoading) return state;

      // Start loading
      state.isLoading = true;

      // Fetch data
      fetchData<Global>("/api/global")
        .then((response) => {
          set({
            globalData: response.data,
            isGlobalFetched: true,
            isLoading: false,
          });
        })
        .catch((error) => {
          set({
            error: error instanceof Error ? error : new Error("Unknown error"),
            isLoading: false,
          });
        });

      return state;
    });
  },
}));
