import React, { useState } from 'react';
import './PopularProducts.css'; // assuming CSS is here

const PopularProducts = () => {
const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

const productList = [
  {
    name: "Toon Burger",
    price: "$9.99",
    img: "/images/toon-burger.jpg",
    description: "A wacky burger from Toon Town!",
    rating: 2.5,
  },
  {
  name: "Krusty Krab Pizza",
    price: "$12.99",
    img: "/images/krusty-krab-pizza.jpg",
    description: "The pizza that’s the pizza, for you and me! From the Krusty Krab.",
    rating: 5,
  },
  {
    name: "Butterbeer",
    price: "$7.99",
    img: "/images/butterbeer.jpg",
    description: "A magical drink, famous in the wizarding world of Harry Potter.",
  },
  {
    name: "Pink Donut",
    price: "$2.50",
    img: "/images/pink-donut.jpg",
    description: "The iconic donut from Homer Simpson’s favorite place, Lard Lad’s.",
  },
  {
    name: "Scooby Snacks",
    price: "$4.99",
    img: "/images/scooby-snacks.jpg",
    description: "Scooby-Doo’s favorite treat, perfect for both humans and dogs!",
  },
  {
    name: "Turkey Leg",
    price: "$10.99",
    img: "/images/turkey-leg.jpg",
    description: "The Flintstones’ classic feast - a giant turkey leg for the prehistoric foodie.",
  },
  {
    name: "Jellyfish Jelly Sandwich",
    price: "$5.50",
    img: "/images/jellyfish-jelly-sandwich.jpg",
    description: "A tasty treat made with jellyfish jelly, straight from SpongeBob’s kitchen!",
  },
  {
    name: "Cheese",
    price: "$3.99",
    img: "/images/cheese.jpg",
    description: "Tom and Jerry’s favorite snack. Pure, delicious cheese.",
  },
  {
    name: "Bug Juice",
    price: "$2.99",
    img: "/images/bug-juice.jpg",
    description: "The strange but refreshing drink from Camp Lazlo, made from bug juice.",
  },
  {
    name: "Space Sandwich",
    price: "$8.99",
    img: "/images/space-sandwich.jpg",
    description: "A futuristic sandwich from Jimmy Neutron, made with the finest intergalactic ingredients.",
  },
  {
    name: "Triple Gooberberry Sunrise",
    price: "$5.99",
    img: "/images/triple-gooberberry-sunrise.jpg",
    description: "A wild and colorful drink made by the characters from Spongebob. Attention, it contains alcohol (somehow)!",
  },
  {
    name: "Everything Burrito",
    price: "$11.99",
    img: "/images/everything-burrito.jpg",
    description: "The infamous Everything Burrito from Adventure Time, with everything inside it!",
  },

];

const handleCardClick = (product) => {
    setSelectedProduct(product);
  };
// Toggle favorites
const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(product)) {
        return prevFavorites.filter((item) => item !== product);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Show product details in modal
  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="popular-products">
      <h2>Popular Products</h2>
      <div className="product-grid">
        {productList.map((product, index) => (
          <div className="product-card" key={index} onClick={() => handleCardClick(product)}>
            <div className="product-img-wrapper">
              <img src={product.img} alt={product.name} />
              <div className="product-actions">
                
                <button className="favorite-btn"  onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}>
                     <i
                      className={`fas fa-heart ${favorites.includes(product) ? "favorited" : ""}`}
                    ></i></button>
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
              <span className="product-price">{product.price}</span>
 </div>
              <div className="product-rating">
  {[...Array(5)].map((_, i) => (
    <i
      key={i}
      className={`fas fa-star ${i < Math.floor(product.rating) ? "filled" : ""}`}
    ></i>
  ))}
  {product.rating % 1 !== 0 && <i className="fas fa-star-half-alt filled"></i>}
</div>
           
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="product-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.img} alt={selectedProduct.name} />
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.description}</p>
            <p className="product-price">{selectedProduct.price}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
