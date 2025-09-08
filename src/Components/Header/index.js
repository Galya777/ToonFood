import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../Pages/CardPage/CartContext';

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(() => {
    try {
      const params = new URLSearchParams(location.search);
      return params.get('q') || '';
    } catch {
      return '';
    }
  });
  const searchInputRef = useRef(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      setQuery(params.get('q') || '');
    } catch {}
  }, [location.search]);

  const submitSearch = () => {
    try {
      const params = new URLSearchParams(location.search);
      if (query) params.set('q', query);
      else params.delete('q');
      navigate({ pathname: location.pathname, search: params.toString() });
    } catch {}
  };

  const keyBufferRef = useRef({ lastKey: null, timer: null });
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
      const isTyping = tag === 'input' || tag === 'textarea' || e.isComposing;
      if (!isTyping && e.key === '/') {
        e.preventDefault();
        if (searchInputRef.current) searchInputRef.current.focus();
        return;
      }
      if (!isTyping) {
        const kb = keyBufferRef.current;
        const key = (e.key || '').toLowerCase();
        if (key === 'g') {
          if (kb.timer) clearTimeout(kb.timer);
          kb.lastKey = 'g';
          kb.timer = setTimeout(() => { kb.lastKey = null; kb.timer = null; }, 800);
        } else if (key === 'c' && kb.lastKey === 'g') {
          e.preventDefault();
          kb.lastKey = null;
          if (kb.timer) { clearTimeout(kb.timer); kb.timer = null; }
          navigate('/cart');
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  const previewTitle = (() => {
    if (!cart || cart.length === 0) return "Shopping Bag (empty)";
    const itemsStr = cart
      .slice(0, 3)
      .map(i => `${i.name} × ${i.quantity || 0}`)
      .join(", ");
    const extra = cart.length > 3 ? `, +${cart.length - 3} more` : "";
    return `Shopping Bag • ${cartCount} item${cartCount !== 1 ? 's' : ''} • ${itemsStr}${extra} • Total ${cartTotal.toFixed(2)}`;
  })();
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
          <img src="/images/mainImage.jpg" alt="Toon Food" />
          <div className="text">
            <h1>Toon food</h1>
            <p>Food from your favourite world.</p>
          </div>
        </div>
        <div className="user-icons">
          <div className="top-icons">
            <a href="/login" title="Log In"><i className="fas fa-sign-in-alt"></i></a>
            <a href="/signup" title="Sign Up"><i className="fas fa-user-plus"></i></a>
            <Link to="/cart" title={previewTitle} aria-label={previewTitle}>
              <i className="fas fa-shopping-bag"></i>
              <span className="cart-count">{cartCount}</span>
              <span className="cart-price"> ${cartTotal.toFixed(2)}</span>
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
                <li><Link to="/restaurant/Timi's%20Mother"><i className="fas fa-user-nurse"></i> Timi's Mother</Link></li>
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

            <li><Link to="/">Games</Link></li>
            <li><Link to="/">Help</Link></li>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">About</Link></li>
          </ul>

          <div className="searchBox">
            <input
              className="searchInput"
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitSearch(); } }}
              ref={searchInputRef}
            />
            <button className="searchButton" type="button" onClick={submitSearch} aria-label="Search">
              <i className="material-icons">search</i>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;