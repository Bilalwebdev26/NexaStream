import { create } from "zustand";

export const useSideBarStore = create((set) => ({
  showsidebar: true,
  setsideBar: (showsidebar) => {
    set({ showsidebar });
  },
}));
