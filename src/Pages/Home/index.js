import Slider from "react-slick";


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

 <div className="main-section">
<div className="vertical-menu-categories">
  <button><i className="fas fa-utensils"></i> Appetizers</button>
  <button><i className="fas fa-egg"></i> Breakfast</button>
  <button><i className="fas fa-hamburger"></i> Fast food</button>
  <button><i className="fas fa-leaf"></i> Salads</button>
  <button><i className="fas fa-mug-hot"></i> Soups</button>
  <button><i className="fas fa-drumstick-bite"></i> Dishes</button>
  <button><i className="fas fa-ice-cream"></i> Desserts</button>
  <button><i className="fas fa-coffee"></i> Drinks</button>
  <button><i className="fas fa-ellipsis-h"></i> Other Stuff</button>
</div>

<div className="popular-products">
    <h2>Popular Products</h2>
    {/* Map through product data here */}
    <div className="product-card">Toon Burger</div>
    <div className="product-card">Krusty Krab Pizza</div>
    <div className="product-card">Butterbeer</div>
  </div>

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
      <img src="/restaurants/krusty-krab.jpg" alt="Krusty Krab" />
      <span>Krusty Krab</span>
    </button>
    <button className="restaurant-card">
      <img src="/restaurants/mos-eisley.jpg" alt="Mos Eisley Cantina" />
      <span>Mos Eisley Cantina</span>
    </button>
    <button className="restaurant-card">
      <img src="/restaurants/central-perk.jpg" alt="Central Perk" />
      <span>Central Perk</span>
    </button>
  </div>
</div>

<footer className="site-footer">
  <p>&copy; 2025 Fictional Foods. All rights reserved.</p>
</footer>

        </>
    )
}

export default Home;