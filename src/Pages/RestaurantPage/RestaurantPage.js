import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../../Components/Popular Products/ProductGrid';

const RestaurantPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/restaurant/${encodeURIComponent(name)}`)
      .then((res) => {
        if (!res.ok) throw new Error('No products from this restaurant. Be patient! We will charge soon!');
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
  )
};

export default RestaurantPage;
