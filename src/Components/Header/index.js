import React from "react";
import { Link } from 'react-router-dom';

const Header =()=>{
    return(
    <>
        <div className="header">
            <div className="top-script">
<div className="container">
    <p className="mb-0">This site is for fictional food only. Unfortunatelly, we cannot deliver it to you.
         The purpose of developing is just for fun and to explore the crazy world of cartoon food</p>
</div>
            </div>
        </div>

        <div className="titteCard">
        <div id="title">
  <img src="/images/mainImage.jpg" alt="Toon Food Image" />
  <div class="text">
    <h1>Toon food</h1>
    <p>Food from your favourite world.</p>
  </div>
</div>
<div class="user-icons">
  <div class="top-icons">
    <a href="/login" title="Log In"><i class="fas fa-sign-in-alt"></i></a>
    <a href="/signup" title="Sign Up"><i class="fas fa-user-plus"></i></a>
    <a href="/cart" title="Shopping Bag"><i class="fas fa-shopping-bag"></i>
    <span className="cart-count">0</span>
    <span className="cart-price"> $0</span></a>
 </div>
</div>

        </div>


        <div id="container">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>

            <li>
              <a >Places</a>
              <ul>
           
                <li><Link to="/restaurant/Krusty%20Krab"><i class="fas fa-hamburger"></i> Krusty Krab</Link></li>
  <li><Link to="/restaurant/Bob's%20Burgers"><i class="fas fa-store"></i> Bob's Burgers</Link></li>
  <li><Link to="/restaurant/The%20Simpsons"><i class="fas fa-beer"></i> The Simpsons</Link></li>
  <li><Link to="/restaurant/Tom%20and%20Jerry"><i class="fas fa-cat"></i> Tom and Jerry</Link></li>
  <li><Link to="/restaurant/Amphibia"><i class="fas fa-frog"></i> Amphibia</Link></li>
  <li><Link to="/restaurant/Timi's%20KMother"><i class="fas fa-user-nurse"></i> Timi's Mother</Link></li>
  <li><Link to="/restaurant/Disney"><i class="fas fa-chess-rook"></i> Disney</Link></li>
  <li><Link to="/restaurant/Anime"><i class="fas fa-dragon"></i> Anime</Link></li>
  <li><Link to="/restaurant/Nicktoons"><i class="fas fa-tv"></i> Nicktoons</Link></li>


              </ul>
            </li>

            <li>
              <a >Menu</a>
              <ul>
              <li><Link to="/categories/appetizers"><i class="fas fa-utensils"></i> Appetizers</Link></li>
  <li><Link to="/categories/breakfast"><i class="fas fa-egg"></i> Breakfast</Link></li>
  <li><Link to="/categories/fast%20food"><i class="fas fa-hamburger"></i> Fast food</Link></li>
  <li><Link to="/categories/salads"><i class="fas fa-leaf"></i> Salads</Link></li>
  <li><Link to="/categories/soups"><i class="fas fa-mug-hot"></i> Soups</Link></li>
  <li><Link to="/categories/dishes"><i class="fas fa-drumstick-bite"></i> Dishes</Link></li>
  <li><Link to="/categories/desserts"><i class="fas fa-ice-cream"></i> Desserts</Link></li>
  <li><Link to="/categories/drinks"><i class="fas fa-coffee"></i> Drinks</Link></li>
  <li><Link to="/categories/other"><i class="fas fa-ellipsis-h"></i> Other Stuff</Link></li>
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
    )
}

export default Header;