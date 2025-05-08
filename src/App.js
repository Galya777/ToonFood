import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantPage from './Pages/RestaurantPage/RestaurantPage';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import CartProvider  from './Pages/CardPage/CartContext';
import  CartPage  from './Pages/CardPage/CartPage';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:name" element={<RestaurantPage />} />
        <Route path="/categories/:name" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
