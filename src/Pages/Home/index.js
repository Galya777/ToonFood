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
           <div className="main-section">

           <div className="slider-wrapper">
  <Slider {...settings}>
    <img src="/images/slider1.jpeg" alt="slide 1" />
    <img src="/images/slider2.jpg" alt="slide 2" />
    <img src="/images/slider3.jpg" alt="slide 3" />
    <img src="/images/slider4.jpg" alt="slide 4" />
    <img src="/images/slider5.jpg" alt="slide 5" />
  </Slider>
</div>


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



</div>

        </>
    )
}

export default Home;