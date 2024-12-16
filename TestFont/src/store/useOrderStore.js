import {create} from 'zustand';

export const useOrdersStore = create((set) => ({
  ordersList: [],
  isLoadingOrder: true,

  setOrdersList: (ordersList) => set({ ordersList }),
  setFilteredProduct: (filteredProduct) => set({ filteredProduct }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
