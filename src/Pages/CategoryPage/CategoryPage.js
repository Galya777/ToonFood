import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../../Components/Popular Products/ProductGrid';

const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/categories/${encodeURIComponent(name)}`)
      .then((res) => {
        if (!res.ok) throw new Error('No products found in the category.');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, [name]);
  

  if (error) return <p>{error}</p>;
  return (
    <div>
    <h2>Prducts from: {name}</h2>
    {products.length > 0 ? (
    <ProductGrid products={products} />
  ) : (
    <p>{error || 'Няма продукти.'}</p>
  )}
</div>
  );
};

export default CategoryPage;
