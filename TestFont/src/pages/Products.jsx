import { useEffect, useState } from 'react';
import API from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-blue-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
