/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import ListWithLoaderProduct from "./ListWithLoaderProduct";
import { fetchProducts } from '../services/products';
import { useProductsStore } from "../store/useProductsStore"
import {initProductImages} from "../utils/utils";
import { Box } from "@mui/material";
import NoResults from "./NoResults";

const dummyProducts = [
  {
    id: 1,
    name: "T-Shirt Classic",
    description: "High-quality cotton T-shirt",
    code: "TS123",
    price: "25.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Blue Jeans",
    description: "Stylish blue jeans",
    code: "BJ456",
    price: "40.00$",
    image: "https://via.placeholder.com/200",
  },
  // Add more dummy products if needed
];



const ProductGrid = () => {
  
  const { isLoading, setFilteredProduct, filteredProduct, setProducts, setIsLoading } = useProductsStore();

  const [catReducer , setCatReducer] = useState({}) ;

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const response = await fetchProducts();
      // setCatReducer(groupProductsByCategory(response));
      const productInit = initProductImages(response)
      console.log(productInit);
      setProducts(productInit);
      setFilteredProduct(productInit);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }



  function groupProductsByCategory(products) {
    return products.reduce((categories, product) => {
      // Vérifie si la catégorie existe déjà dans l'objet
      if (!categories[product.Category.name]) {
        categories[product.Category.name] = [];
      }
      // Ajoute le produit à la catégorie correspondante
      categories[product.Category.name].push(product);
      return categories;
    }, {});
  }

  return (
    <ListWithLoaderProduct
      items={filteredProduct}
      isLoading={isLoading}
      message="Aucun produit trouvée"
    />
  );
};

export default ProductGrid;



// <Box
// display="grid"
// gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
// gap={2}
// maxHeight="calc(100vh - 150px)"
// overflow="auto"
// >
// {filteredProducts.length > 0 ? (
//   filteredProducts.map((product) => (
//     <ProductCard key={product.id} product={product} />
//   ))
// ) : (
//   <Box height="100%">
//     <NoResults message="Aucun produit trouvé." />
//   </Box>
// )}
// </Box>