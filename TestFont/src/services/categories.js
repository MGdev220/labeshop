/* eslint-disable no-unused-vars */
import axios from 'axios';
import { API_BASE_URL } from "./api"

export const fetchCategories = async () => {
    try {
        const response = await axios.get(API_BASE_URL+"/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const getProductsByCategory = async (categorieId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${categorieId}/products`);
      return response.data; // Retourne les produits récupérés
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      throw error;
    }
  };