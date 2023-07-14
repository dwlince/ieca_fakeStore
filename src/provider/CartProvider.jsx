import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload.id),
      };
    case "TOTAL_PRICE":
      return {
        ...state,
        totalPrice: state.cart.reduce(
          (prev, product) => prev + product.price,
          0
        ),
      };
    case "TOTAL_PRODUCT":
      return {
        ...state,
        totalProduct: state.cart.length,
      };

    default:
      return state;
  }
};
const BuscarProducto = ({ product }) => {
  let stateCart = JSON.parse(localStorage.getItem("state"));

  const productoEnCarro = stateCart.cart.some((item) => item.id === product.id);
  if (productoEnCarro) {
    return true;
  } else {
    return false;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("state")) ?? {
      cart: [],
      totalPrice: 0,
      totalProduct: 0,
      cartIn: [],
    }
  );

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    dispatch({ type: "TOTAL_PRICE" });
    dispatch({ type: "TOTAL_PRODUCT" });
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { BuscarProducto, CartProvider, useCartContext };
