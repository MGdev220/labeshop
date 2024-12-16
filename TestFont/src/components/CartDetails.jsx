/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../assets/style/cart.css";
import { useCartStore } from "../store/useCartStore "
import { updateQuantity } from "../services/cart";

const CartDetails = ({ cartItems, onRemove, onCheckout, onUpdateQuantity }) => {
  const { setWaiting, waiting } = useCartStore()

  const calculateTotal = () =>
    cartItems.Products?.reduce((total, item) => total + item.price * item.CartProducts.quantity, 0);

  const UpdateQuantity = async (cartId, productId, newQuantity) => {
    try {
      setWaiting(true)
      const response = await updateQuantity(cartId, productId, newQuantity);
      setWaiting(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="cart-container">
      <h1>Votre Panier</h1>
      {cartItems?.Products?.length === 0 ? (
        <div className="empty-cart">Votre panier est vide.</div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-container">
            <div className="cart-items">
              {cartItems.Products?.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span>Prix: {item.price}€</span>
                    <div className="cart-item-actions">
                      <div className="quantity-actions">
                        <button
                          className="quantity-button"
                          onClick={() => { onUpdateQuantity(item.id, -1); UpdateQuantity(cartItems.id, item.id, item.CartProducts.quantity - 1) }}
                          disabled={item.CartProducts.quantity <= 1 || waiting}
                        >
                          -
                        </button>
                        <span>Quantité: {item.CartProducts.quantity}</span>
                        <button
                          className="quantity-button"
                          onClick={() => { onUpdateQuantity(item.id, 1); UpdateQuantity(cartItems.id, item.id, item.CartProducts.quantity + 1) }}
                          disabled={waiting}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="remove-button"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-summary">
            <h2>Résumé du Panier</h2>
            <p>
              <strong>Total:</strong> {calculateTotal()}€
            </p>
            <button onClick={() => { onCheckout(calculateTotal()) }} className="checkout-button">
              {"Valider l'achat"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;



