import { create } from "zustand";
import type { Category } from "@/types/category";

type CategoryDialogStore = {
  open: boolean;
  mode: "create" | "edit";
  selectedCategory: Category | null;

  openCreateDialog: () => void;
  openEditDialog: (category: Category) => void;
  closeDialog: () => void;
};

export const useCategoryDialogStore = create<CategoryDialogStore>((set) => ({
  open: false,
  mode: "create",
  selectedCategory: null,

  openCreateDialog: () =>
    set({ open: true, mode: "create", selectedCategory: null }),

  openEditDialog: (category) =>
    set({ open: true, mode: "edit", selectedCategory: category }),

  closeDialog: () => set({ open: false, selectedCategory: null }),
}));
