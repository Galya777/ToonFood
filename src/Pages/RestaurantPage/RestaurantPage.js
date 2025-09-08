import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../../Components/Popular Products/ProductGrid';

const RestaurantPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const API_BASE = process.env.REACT_APP_API_BASE || '';

  useEffect(() => {
    fetch(`${API_BASE}/api/products/restaurant/${encodeURIComponent(name)}`)
      .then((res) => {
        if (!res.ok) throw new Error('No products from this restaurant. Be patient! We will add more soon!');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, [name, API_BASE]);

  useEffect(() => {
    try {
      document.title = `Toon Food — ${name}`;
    } catch {}
  }, [name]);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    servesCuisine: 'Fictional',
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Products from: {name}</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>{error || 'No products.'}</p>
      )}
    </div>
  )
};

export default RestaurantPage;
