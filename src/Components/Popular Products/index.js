import React, { useEffect, useState } from 'react';
import './PopularProducts.css';
import { useCart } from '../../Pages/CardPage/CartContext';

const PopularProducts = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  const API_BASE = process.env.REACT_APP_API_BASE || '';

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error loading products:', err));
  }, [API_BASE]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const toggleFavorite = (product) => {
    const id = product._id || product.id || product.name;
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const addToCart = (product) => {
    const id = product._id || product.id || product.name;
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, name: product.name, price: product.price }
    });
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <div className="popular-products">
      <h2>Popular Products</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div
            className="product-card"
            key={product._id || product.id || index}
            onClick={() => handleCardClick(product)}
          >
            <div className="product-img-wrapper">
              <img src={product.image} alt={product.name} />
              <div className="product-actions">
                <button
                  className="favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                >
                  <i
                    className={`fas fa-heart ${
                      favorites.includes(product._id || product.id || product.name) ? 'favorited' : ''
                    }`}
                  ></i>
                </button>
                <button
                  className="cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  <i className="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">$ {product.price}</span>
            </div>
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star ${
                    i < Math.floor(product.rating || 0) ? 'filled' : ''
                  }`}
                ></i>
              ))}
              {(product.rating || 0) % 1 !== 0 && (
                <i className="fas fa-star-half-alt filled"></i>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="product-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.description}</p>
            <p className="product-price">{selectedProduct.price}$</p>
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star ${
                    i < Math.floor(selectedProduct.rating || 0) ? 'filled' : ''
                  }`}
                ></i>
              ))}
              {(selectedProduct.rating || 0) % 1 !== 0 && (
                <i className="fas fa-star-half-alt filled"></i>
              )}
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
