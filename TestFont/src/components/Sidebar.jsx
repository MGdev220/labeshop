/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { fetchCategories, getProductsByCategory } from "../services/categories";
import ListWithLoader from "./ListWithLoader";
import {initProductImages} from '../utils/utils';
import { useCategoryStore } from "../store/useCategoryStore";
import { useProductsStore } from "../store/useProductsStore";
import { Box, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";

const categories = ["T-Shirts", "Jeans", "Jackets", "Shoes", "Accessories"];

const Sidebar = () => {

  const { setCategories, categories, filteredCategories, setFilteredCategories, isLoading, setIsLoading } = useCategoryStore();
  const { setFilteredProduct } = useProductsStore();

  const setCategoryFilter = (value) => {
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filteredCategories);
  }

  useEffect(
    () => {
      fetchAllCategories();
      getAllProductsByCategory()
    }, []
  )

  const fetchAllCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response);
      setFilteredCategories(response);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };


  const getAllProductsByCategory = async (categoryId) => {
    try {
      const response = await getProductsByCategory(categoryId);
      console.log(response);
      const result = initProductImages(response.products)
      setFilteredProduct(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      width="250px"
      bgcolor="#f4f4f4"
      p={2}
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h6" gutterBottom>
        Catégories
      </Typography>
      <TextField
        label="Rechercher une catégorie"
        variant="outlined"
        size="small"
        // value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        sx={{ mb: 2 }}
      />
      <div>
        <ListWithLoader
          items={filteredCategories}
          isLoading={isLoading}
          message="Aucune categorie trouvée"
          getAllProductsByCategory={getAllProductsByCategory}
        />
      </div>
    </Box>
  );
};

export default Sidebar;