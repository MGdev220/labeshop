/* eslint-disable no-unused-vars */
import axios from 'axios';
import { API_BASE_URL } from "./api"
import API from './api';

export const addOrder = async (userId, products, total, status = "en attente") => {
    try {
        const response = await API.post('/orders/', { userId, products, total, status });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l’ajout de la commande:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Erreur lors de l’ajout de la commande:' };
    }
};

export const getUserOrders = async (userId) => {
    try {
        const response = await API.get(`${API_BASE_URL}/orders/user/${userId}/orders`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la recuperation des commandes:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Erreur lors de la recuperation des commandes' };
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await API.post(`${API_BASE_URL}/orders/orders/${orderId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la modification du status de commandes:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Erreur lors de la modification du status de commandes' };
    }
};


export const deleteOrder = async (orderId) => {
    try {
        const response = await API.delete(`${API_BASE_URL}/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la supression de la commandes:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Erreur lors de la supression de la commandes' };
    }
};
