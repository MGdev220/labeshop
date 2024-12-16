import {create} from 'zustand';

export const useProductsStore = create((set) => ({
  products: [],
  filteredProduct: [],
  isLoading: true,

  setProducts: (products) => set({ products }),
  setFilteredProduct: (filteredProduct) => set({ filteredProduct }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
