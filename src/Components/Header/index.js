import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="top-script">
          <div className="container">
            <p className="mb-0">
              This site is for fictional food only. Unfortunately, we cannot deliver it to you.
              The purpose of developing is just for fun and to explore the crazy world of cartoon food.
            </p>
          </div>
        </div>
      </div>

      <div className="titleCard">
        <div id="title">
          <img src="/images/mainImage.jpg" alt="Toon Food Image" />
          <div className="text">
            <h1>Toon food</h1>
            <p>Food from your favourite world.</p>
          </div>
        </div>
        <div className="user-icons">
          <div className="top-icons">
            <a href="/login" title="Log In"><i className="fas fa-sign-in-alt"></i></a>
            <a href="/signup" title="Sign Up"><i className="fas fa-user-plus"></i></a>
            <Link to="/cart" title="Shopping Bag">
              <i className="fas fa-shopping-bag"></i>
              <span className="cart-count">0</span>
              <span className="cart-price"> $0</span>
            </Link>
          </div>
        </div>
      </div>

      <div id="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>

            <li>
              <button type="button" className="menu-toggle" aria-haspopup="true" aria-expanded="false">Places</button>
              <ul>
                <li><Link to="/restaurant/Krusty%20Krab"><i className="fas fa-hamburger"></i> Krusty Krab</Link></li>
                <li><Link to="/restaurant/Bob's%20Burgers"><i className="fas fa-store"></i> Bob's Burgers</Link></li>
                <li><Link to="/restaurant/The%20Simpsons"><i className="fas fa-beer"></i> The Simpsons</Link></li>
                <li><Link to="/restaurant/Tom%20and%20Jerry"><i className="fas fa-cat"></i> Tom and Jerry</Link></li>
                <li><Link to="/restaurant/Amphibia"><i className="fas fa-frog"></i> Amphibia</Link></li>
                <li><Link to="/restaurant/Timi's%20KMother"><i className="fas fa-user-nurse"></i> Timi's Mother</Link></li>
                <li><Link to="/restaurant/Disney"><i className="fas fa-chess-rook"></i> Disney</Link></li>
                <li><Link to="/restaurant/Anime"><i className="fas fa-dragon"></i> Anime</Link></li>
                <li><Link to="/restaurant/Nicktoons"><i className="fas fa-tv"></i> Nicktoons</Link></li>
              </ul>
            </li>

            <li>
              <button type="button" className="menu-toggle" aria-haspopup="true" aria-expanded="false">Menu</button>
              <ul>
                <li><Link to="/categories/appetizer"><i className="fas fa-utensils"></i> Appetizers</Link></li>
                <li><Link to="/categories/breakfast"><i className="fas fa-egg"></i> Breakfast</Link></li>
                <li><Link to="/categories/fast%20food"><i className="fas fa-hamburger"></i> Fast food</Link></li>
                <li><Link to="/categories/salad"><i className="fas fa-leaf"></i> Salads</Link></li>
                <li><Link to="/categories/soup"><i className="fas fa-mug-hot"></i> Soups</Link></li>
                <li><Link to="/categories/dish"><i className="fas fa-drumstick-bite"></i> Dishes</Link></li>
                <li><Link to="/categories/dessert"><i className="fas fa-ice-cream"></i> Desserts</Link></li>
                <li><Link to="/categories/drink"><i className="fas fa-coffee"></i> Drinks</Link></li>
                <li><Link to="/categories/other"><i className="fas fa-ellipsis-h"></i> Other Stuff</Link></li>
              </ul>
            </li>

            <li><a href="#">Games</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">About</a></li>
          </ul>

          <div className="searchBox">
            <input className="searchInput" type="text" placeholder="Search" />
            <button className="searchButton">
              <i className="material-icons">search</i>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;