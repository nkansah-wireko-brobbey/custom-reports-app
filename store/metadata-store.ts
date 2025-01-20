import { create } from "zustand";
import { Metadata } from "@/types/metadata";

type MetadataStore = {
  metadata: Metadata | null; // Metadata state
  setMetadata: (data: Metadata) => void; // Update metadata
  clearMetadata: () => void; // Clear metadata
};

const useMetadataStore = create<MetadataStore>((set) => ({
  metadata: null, // Initial state
  setMetadata: (data) => set({ metadata: data }),
  clearMetadata: () => set({ metadata: null }),
}));

export default  useMetadataStore