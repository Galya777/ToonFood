import Slider from "react-slick";
import PopularProducts from "../../Components/Popular Products";
import { Link } from 'react-router-dom';

const Home =()=>{
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

 
    return(
        <>
          

           <div className="slider-wrapper">
  <Slider {...settings}>
    <img src="/images/slider1.jpeg" alt="slide 1" />
    <img src="/images/slider2.jpg" alt="slide 2" />
    <img src="/images/slider3.jpg" alt="slide 3" />
    <img src="/images/slider4.jpg" alt="slide 4" />
    <img src="/images/slider5.jpg" alt="slide 5" />
  </Slider>
</div>

<div className="main-content-wrapper">
<div className="vertical-menu-categories">
  <Link to="/categories/appetizer" className="menu-link">
    <i className="fas fa-utensils"></i> Appetizers
  </Link>
  <Link to="/categories/breakfast" className="menu-link">
    <i className="fas fa-egg"></i> Breakfast
  </Link>
  <Link to="/categories/fast%20food" className="menu-link">
    <i className="fas fa-hamburger"></i> Fast food
  </Link>
  <Link to="/categories/salad" className="menu-link">
    <i className="fas fa-leaf"></i> Salads
  </Link>
  <Link to="/categories/soup" className="menu-link">
    <i className="fas fa-mug-hot"></i> Soups
  </Link>
  <Link to="/categories/dishe" className="menu-link">
    <i className="fas fa-drumstick-bite"></i> Dishes
  </Link>
  <Link to="/categories/dessert" className="menu-link">
    <i className="fas fa-ice-cream"></i> Desserts
  </Link>
  <Link to="/categories/drink" className="menu-link">
    <i className="fas fa-coffee"></i> Drinks
  </Link>
  <Link to="/categories/other" className="menu-link">
    <i className="fas fa-ellipsis-h"></i> Other Stuff
  </Link>
</div>



<PopularProducts />

  <div className="ads-section">
    <h2>Sponsored</h2>
    <img src="/ads/ad1.jpg" alt="Ad 1" />
    <img src="/ads/ad2.jpg" alt="Ad 2" />
  </div>
</div>

<div className="featured-restaurants">
  <h2>Featured Restaurants</h2>
  <div className="restaurant-buttons">
    <button className="restaurant-card">
      <img src="/images/krusty-krab.jpg" alt="Krusty Krab" />
      <span>Krusty Krab</span>
    </button>
    <button className="restaurant-card">
      <img src="/images/krusty-burger.jpg" alt="Krusty Burger" />
      <span>Krusty Burger</span>
    </button>
    <button className="restaurant-card">
      <img src="/images/frying-dutchman.jpg" alt="The Frying Dutchman" />
      <span>The Frying Dutchman</span>
    </button>
    <button className="restaurant-card">
      <img src="/images/pizza-planet.jpg" alt="Pizza Planet" />
      <span>Pizza Planet</span>
    </button>
    <button className="restaurant-card">
      <img src="/images/moes-tavern.jpg" alt="Moe’s Tavern" />
      <span>Moe’s Tavern</span>
    </button>
    <button className="restaurant-card">
      <img src="/images/chokey-chicken.jpg" alt="Chokey Chicken" />
      <span>Chokey Chicken</span>
    </button>
    <button className="restaurant-card">
      <img src="/images/drunken-clam.jpg" alt="The Drunken Clam" />
      <span>The Drunken Clam</span>
    </button>
    <button className="restaurant-card">
      <img src="/images/bobs-burgers.jpg" alt="Bob's Burgers" />
      <span>Bob's Burgers</span>
    </button>
    <button className="restaurant-card">
      <img src="/images/gusteaus-restaurant.jpg" alt="Gusteau’s Restaurant" />
      <span>Gusteau’s Restaurant</span>
    </button>
  </div>
</div>





        </>
    )
}

export default Home;

