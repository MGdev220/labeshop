import { create } from 'zustand';

export const useCategoryStore = create((set) => ({
  categories: [],
  filteredCategories: [],
  isLoading: true,

  setCategories: (categories) => set({ categories }),
  setFilteredCategories: (filteredCategories) => set({ filteredCategories }),
  setIsLoading: (isLoading) => set({ isLoading }),

}));
