/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore "
import { decodeUserByToken } from "../utils/utils"
import { useNavigate } from "react-router-dom";
import CartDetails from "../components/CartDetails";
import { fetchCartItems, removeProductFromCart } from "../services/cart";
import { isConnectUser, initProductImages } from "../utils/utils";
import { addOrder } from "../services/order";
import { useAlert } from 'react-alert'

const Cart = () => {

  const alert = useAlert()
  const { cartItems, setCartItems } = useCartStore()
  const Navigate = useNavigate()

  useEffect(() => {
    if (!isConnectUser()) {
      Navigate("/login")
    } else {
      fetchAllCartItems()
    }
  }, [])

  const fetchAllCartItems = async () => {
    const response = await fetchCartItems(decodeUserByToken().id || null)
    initProductImages();
    setCartItems({...response, Products: initProductImages(response.Products)});
    console.log(response);
  }


  const handleRemove = async (productId) => {
    try {
      const response = await removeProductFromCart(productId, decodeUserByToken().id || null);
      console.log(response);
      alert.success(response.message)
      setCartItems({ ...cartItems, Products: cartItems.Products.filter((item) => item.id !== productId) });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = (id, change) => {
    const newData = (prevItems) =>
      cartItems.Products.map((item) =>
        item.id === id
          ? { ...item, CartProducts: { quantity: Math.max(item.CartProducts.quantity + change, 1) } }
          : item
      )
    setCartItems({ ...cartItems, Products: newData() })
  };

  const handleCheckout = async (totalCart) => {
    const user = decodeUserByToken().id || null;
    const products = cartItems.Products;
    const response = await addOrder(user, products, totalCart);
    alert.success(response.message)
    Navigate("/order");
  };

  return (
    <>
      <CartDetails
        cartItems={cartItems}
        onRemove={handleRemove}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </>

  );
};

export default Cart;








