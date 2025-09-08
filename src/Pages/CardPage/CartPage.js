import { useCart } from "./CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CartPage = () => {
  const { cart, dispatch, saved, savedDispatch, promoCode, setPromoCode } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [announce, setAnnounce] = useState("");
  const liveRef = useRef(null);

  const removeItem = (id) => {
    const item = cart.find(i => i.id === id);
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    if (item) setAnnounce(`${item.name} removed from cart`);
  };

  const clearCart = () => {
    if (window.confirm("Clear all items from your cart?")) {
      dispatch({ type: "CLEAR_CART" });
    }
  };

  const decrement = (id) => {
    const item = cart.find(i => i.id === id);
    dispatch({ type: "DECREMENT_FROM_CART", payload: id });
    if (item) setAnnounce(`${item.name} quantity decreased`);
  };

  const increment = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    setAnnounce(`${item.name} quantity increased`);
  };

  const saveForLater = (item) => {
    savedDispatch({ type: "ADD_SAVED", payload: item });
    dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
    setAnnounce(`${item.name} saved for later`);
  };

  const moveToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    savedDispatch({ type: "REMOVE_SAVED", payload: item.id });
    setAnnounce(`${item.name} moved to cart`);
  };

  const removeSaved = (id) => {
    const item = saved.find(i => i.id === id);
    savedDispatch({ type: "REMOVE_SAVED", payload: id });
    if (item) setAnnounce(`${item.name} removed from saved`);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const taxRate = 0.07;
  const estimatedTax = totalPrice * taxRate;
  const estimatedTotal = totalPrice + estimatedTax;
  const etaText = cartCount > 0 ? (cartCount < 3 ? "Delivery ETA ~25–35 min (simulated)" : "Delivery ETA ~35–50 min (simulated)") : "";

  const shareUrl = useMemo(() => {
    try {
      const data = cart.map(i => ({ id: i.id, q: i.quantity }));
      const encoded = encodeURIComponent(btoa(JSON.stringify(data)));
      const url = new URL(window.location.href);
      url.searchParams.set("cart", encoded);
      return url.toString();
    } catch {
      return window.location.href;
    }
  }, [cart]);

  const PASSPORT_KEY = 'toon-food-passport';
  const [passport, setPassport] = useState(() => {
    try {
      const raw = localStorage.getItem(PASSPORT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try {
      const prevRaw = localStorage.getItem(PASSPORT_KEY);
      const prev = prevRaw ? JSON.parse(prevRaw) : [];
      const current = new Set(prev);
      const add = (list) => { (list || []).forEach(i => { if (i && i.restaurant) current.add(i.restaurant); }); };
      add(cart);
      add(saved);
      const next = Array.from(current);
      setPassport(next);
      localStorage.setItem(PASSPORT_KEY, JSON.stringify(next));
    } catch {}
  }, [cart, saved]);

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const encoded = params.get("cart");
      if (!encoded) return;
      const parsed = JSON.parse(atob(decodeURIComponent(encoded)));
      if (Array.isArray(parsed)) {
        parsed.forEach(({ id, q }) => {
          const savedItem = saved.find(s => s.id === id);
          const inCart = cart.find(c => c.id === id);
          if (inCart) {
            // Increment to reach target q
            const toAdd = Math.max(0, q - (inCart.quantity || 0));
            for (let k = 0; k < toAdd; k++) dispatch({ type: "ADD_TO_CART", payload: inCart });
          } else if (savedItem) {
            // Move from saved then increment
            dispatch({ type: "ADD_TO_CART", payload: savedItem });
            savedDispatch({ type: "REMOVE_SAVED", payload: savedItem.id });
            for (let k = 1; k < q; k++) dispatch({ type: "ADD_TO_CART", payload: savedItem });
          }
        });
        // Cleanup param after import
        params.delete("cart");
        navigate({ search: params.toString() }, { replace: true });
        setAnnounce("Cart imported from link");
      }
    } catch {
      // ignore bad params
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setAnnounce("Cart link copied to clipboard");
    } catch {}
  };

  const printPage = () => { try { window.print(); } catch {} };

  const mysteryBox = () => {
    if (!saved || saved.length === 0) { setAnnounce("No saved items for Mystery Box"); return; }
    const count = Math.min(3, saved.length);
    const pool = [...saved];
    const chosen = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      chosen.push(pool[idx]);
      pool.splice(idx, 1);
    }
    chosen.forEach(item => {
      moveToCart(item);
      const extra = Math.floor(Math.random() * 3);
      for (let k = 0; k < extra; k++) dispatch({ type: "ADD_TO_CART", payload: item });
    });
    setAnnounce(`Mystery Box added ${chosen.length} item${chosen.length !== 1 ? 's' : ''}`);
  };

const exportSaved = () => {
    try {
      const blob = new Blob([JSON.stringify(saved || [], null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "saved-items.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  };

  const importSaved = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (Array.isArray(data)) {
          data.forEach(item => savedDispatch({ type: "ADD_SAVED", payload: item }));
          setAnnounce("Saved list imported");
        }
      } catch {}
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    try {
      document.title = cartCount > 0
        ? `Cart — ${cartCount} item${cartCount !== 1 ? 's' : ''} • ${currency.format(totalPrice)}`
        : 'Cart — empty';
    } catch {}
  }, [cartCount, totalPrice]);

  return (
    <div>
      <div aria-live="polite" aria-atomic="true" style={{ position: "absolute", left: -9999 }} ref={liveRef}>
        {announce}
      </div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Continue shopping</Link></p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
            <li key={item.id}>
            {item.name} - {currency.format(item.price)} × {item.quantity} = {currency.format(item.price * item.quantity)}
            <div>
            <button onClick={() => decrement(item.id)} aria-label={`Decrease ${item.name}`}>-</button>
            <button onClick={() => increment(item)} aria-label={`Increase ${item.name}`}>+</button>
            <button onClick={() => saveForLater(item)}>Save for later</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
            <div>
            <label htmlFor={`note-${item.id}`}>Note:</label>
            <input
            id={`note-${item.id}`}
            type="text"
            value={item.note || ""}
            onChange={(e) => dispatch({ type: "SET_ITEM_NOTE", payload: { id: item.id, note: e.target.value } })}
            placeholder="Add a note (optional)"
            />
            </div>
            </li>
            ))}
          </ul>
          <h3>Total: {currency.format(totalPrice)}</h3>
          <p>Estimated tax: {currency.format(estimatedTax)}</p>
          <p>Estimated total: {currency.format(estimatedTotal)}</p>
          {etaText ? <p>{etaText}</p> : null}
          {passport && passport.length > 0 && (
            <div>
              <strong>Passport badges:</strong> {passport.length} universes — {passport.join(', ')}
            </div>
          )}
          <div>
            <label htmlFor="promo">Promo code:</label>
            <input
              id="promo"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code"
            />
            {promoCode ? <small> Promo saved</small> : null}
          </div>
          <div>
            <button onClick={copyShare}>Share cart</button>
            <button onClick={mysteryBox}>Mystery box</button>
            <button onClick={printPage}>Print</button>
            <button onClick={clearCart}>Clear cart</button>
          </div>
          {saved && saved.length > 0 && (
            <>
              <h3>Saved for later</h3>
              <ul>
                {saved.map(s => (
                  <li key={s.id}>
                    {s.name} - {currency.format(s.price)}
                    <button onClick={() => moveToCart(s)}>Move to cart</button>
                    <button onClick={() => removeSaved(s.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div>
                <button onClick={exportSaved}>Export saved</button>
                <label style={{ display: "inline-block" }}>
                  Import saved
                  <input type="file" accept="application/json" onChange={(e) => e.target.files && importSaved(e.target.files[0])} style={{ display: "none" }} />
                </label>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
