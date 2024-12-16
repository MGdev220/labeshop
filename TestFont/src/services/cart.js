/* eslint-disable no-unused-vars */
import axios from 'axios';
import { API_BASE_URL } from "./api"
import API from './api';

export const addToCart = async (userId, productId, quantity = 1) => {
    try {
        const response = await API.post('/cart/add', { userId, productId, quantity });
        return response.data; // Retourne les données de la réponse si succès
    } catch (error) {
        console.error('Erreur lors de l’ajout au panier:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Erreur lors de l’ajout au panier.' };
    }
};

export const fetchCartItems = async (userId) => {
    try {
        const response = await API.get("/cart/" + userId);
        console.log('response.data : ', response);
        return response.data;
    } catch (err) {
        throw (err.response?.data?.message || "Erreur lors du chargement du panier.");
    }
};

// Modifier la quantité d'un produit
export const updateQuantity = async (cartId, productId, newQuantity) => {
    try {
        if (newQuantity <= 0) return; // Quantité minimale = 1
        const response = await API.put(`/cart/${cartId}/products/${productId}`, { quantity: newQuantity });
        console.log(response);
    } catch (err) {
        throw (err.response?.data?.message || "Erreur lors de la mise à jour de la quantité.");
    }
};

// supprimer un produit du panier
export const removeProductFromCart = async (productId, userId) => {
    try {
        const response = await API.post(`/cart/remove`, { productId, userId });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression du produit du panier :", error);
        throw error.response ? error.response.data : { message: "Erreur inconnue" };
    }
}