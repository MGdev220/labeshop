import axios from 'axios';
import { API_BASE_URL } from "./api"


// Register
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.errors[0].msg || "Erreur lors de l'inscription";
    }
};

// Login
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Erreur lors de la connexion";
    }
};
