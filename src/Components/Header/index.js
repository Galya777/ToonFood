import React from "react";
import Home from "../../Pages/Home";
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
            <li><a href="./src/Pages/Home/index.js">Home</a></li>

            <li>
              <a >Restaurants</a>
              <ul>
                <li><a href="#">Krusty Krab</a></li>
                <li><a href="#">Krusty Burger</a></li>
                <li><a href="#">Tom and Jerry</a></li>
                <li><a href="#">Amphibia</a></li>
                <li><a href="#">Timi's mother</a></li>
                <li><a href="#">Disney</a></li>
                <li><a href="#">Anime</a></li>
                <li><a href="#">Nick</a></li>
              </ul>
            </li>

            <li>
              <a >Menu</a>
              <ul>
              <li><a href="#"><i class="fas fa-utensils"></i> Appetizers</a></li>
  <li><a href="#"><i class="fas fa-egg"></i> Breakfast</a></li>
  <li><a href="#"><i class="fas fa-hamburger"></i> Fast food</a></li>
  <li><a href="#"><i class="fas fa-leaf"></i> Salads</a></li>
  <li><a href="#"><i class="fas fa-mug-hot"></i> Soups</a></li>
  <li><a href="#"><i class="fas fa-drumstick-bite"></i> Dishes</a></li>
  <li><a href="#"><i class="fas fa-ice-cream"></i> Desserts</a></li>
  <li><a href="#"><i class="fas fa-coffee"></i> Drinks</a></li>
  <li><a href="#"><i class="fas fa-ellipsis-h"></i> Other Stuff</a></li>
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
      <Home />
   
        </>
    )
}

export default Header;