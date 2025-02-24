import { ProductItem } from "@/components/Product/Product.type";
import { createContext, useContext, useReducer, ReactNode, FC } from "react";

type CartState = {
  items: ProductItem[];
  count: number;
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Omit<ProductItem, "count"> }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_ITEM_COUNT"; payload: { id: number; count: number } };

type CartContextType = {
  items: ProductItem[];
  addToCart: (product: Omit<ProductItem, "count">) => void;
  removeFromCart: (id: number) => void;
  countItems: () => number;
  setItemCount: (id: number, count: number) => void;
};

const initialState: CartState = {
  items: [],
  count: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex > -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + 1 }
            : item
        );
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, count: 1 }],
      };

    case "REMOVE_FROM_CART":
      const updatedCart = state.items.filter(
        (item) => item?.id !== action.payload
      );
      return { ...state, items: updatedCart };

    case "SET_ITEM_COUNT":
      const updatedCount = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, count: action.payload.count }
            : item
        )
        .filter((item) => item.count > 0);
      return { ...state, items: updatedCount };

    default:
      return state;
  }
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de CartProvider");
  }
  return context;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Omit<ProductItem, "count">) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const setItemCount = (id: number, count: number) => {
    dispatch({ type: "SET_ITEM_COUNT", payload: { id, count } });
  };

  const countItems = () => {
    return state.items.reduce((accumulator, item) => {
      return (accumulator += item.count);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        countItems,
        setItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
