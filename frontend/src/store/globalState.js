import { create } from "zustand";

export const useSideBarStore = create((set) => ({
  showsidebar: false,
  setsideBar: (showsidebar) => {
    set({ showsidebar });
  },
}));
