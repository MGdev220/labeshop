import {create} from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  totalCart: 0 ,
  waiting : false,

  setWaiting: (waiting) => set({waiting}),

  setTotalCart: (totalCart) => set({totalCart}),

  setCartItems: (cartItems) => set({cartItems}),

  addToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),

  clearCart: () => set({ cart: [] }),
}));

