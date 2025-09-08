import { createContext, useContext, useReducer, useEffect, useState } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);
    case "DECREMENT_FROM_CART": {
      const item = state.find(i => i.id === action.payload);
      if (!item) return state;
      if (item.quantity > 1) {
        return state.map(i => (i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return state.filter(i => i.id !== action.payload);
    }
    case "SET_ITEM_NOTE":
      return state.map(i => (i.id === action.payload.id ? { ...i, note: action.payload.note } : i));
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

const STORAGE_KEY = "toon-food-cart";
const SAVED_STORAGE_KEY = "toon-food-saved";
const PROMO_STORAGE_KEY = "toon-food-promo";

const initCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
};

const initSaved = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse saved list from localStorage", e);
    return [];
  }
};

const savedReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SAVED": {
      const exists = state.find(i => i.id === action.payload.id);
      if (exists) return state; // avoid duplicates in saved list
      return [...state, { ...action.payload }];
    }
    case "REMOVE_SAVED":
      return state.filter(i => i.id !== action.payload);
    case "CLEAR_SAVED":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initCart);
  const [saved, savedDispatch] = useReducer(savedReducer, [], initSaved);
  const [promoCode, setPromoCode] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      }
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
      }
    } catch (e) {
      console.error("Failed to save saved list to localStorage", e);
    }
  }, [saved]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (promoCode) localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
        else localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist promo code", e);
    }
  }, [promoCode]);

  return (
    <CartContext.Provider value={{ cart, dispatch, saved, savedDispatch, promoCode, setPromoCode }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;