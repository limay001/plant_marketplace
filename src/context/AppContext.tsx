import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { CartItem, Address, Order } from '@/types';

interface AppState {
  cart: CartItem[];
  wishlist: string[];
  addresses: Address[];
  orders: Order[];
  appliedCoupon: string | null;
}

type Action =
  | { type: 'ADD_TO_CART'; item: CartItem }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; productId: string }
  | { type: 'ADD_ADDRESS'; address: Address }
  | { type: 'UPDATE_ADDRESS'; address: Address }
  | { type: 'DELETE_ADDRESS'; id: string }
  | { type: 'ADD_ORDER'; order: Order }
  | { type: 'UPDATE_ORDER_STATUS'; orderId: string; status: Order['status'] }
  | { type: 'CANCEL_ORDER'; orderId: string }
  | { type: 'APPLY_COUPON'; code: string | null }
  | { type: 'HYDRATE'; state: AppState };

const STORAGE_KEY = 'leafloop-state';

const initialState: AppState = {
  cart: [],
  wishlist: [],
  addresses: [],
  orders: [],
  appliedCoupon: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find((i) => i.productId === action.item.productId);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.productId === action.item.productId
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.item] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((i) => i.productId !== action.productId) };
    case 'UPDATE_QTY':
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.productId === action.productId
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [], appliedCoupon: null };
    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.productId)
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.address] };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map((a) => (a.id === action.address.id ? action.address : a)),
      };
    case 'DELETE_ADDRESS':
      return { ...state, addresses: state.addresses.filter((a) => a.id !== action.id) };
    case 'ADD_ORDER':
      return { ...state, orders: [action.order, ...state.orders] };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.orderId ? { ...o, status: action.status } : o
        ),
      };
    case 'CANCEL_ORDER':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.orderId ? { ...o, status: 'Cancelled' as const } : o
        ),
      };
    case 'APPLY_COUPON':
      return { ...state, appliedCoupon: action.code };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

interface AppContextValue extends AppState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
  applyCoupon: (code: string | null) => void;
  cartCount: number;
  cartTotal: number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AppState;
        dispatch({ type: 'HYDRATE', state: { ...initialState, ...parsed } });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value: AppContextValue = {
    ...state,
    addToCart: (item) => dispatch({ type: 'ADD_TO_CART', item }),
    removeFromCart: (productId) => dispatch({ type: 'REMOVE_FROM_CART', productId }),
    updateQty: (productId, quantity) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleWishlist: (productId) => dispatch({ type: 'TOGGLE_WISHLIST', productId }),
    addAddress: (address) => dispatch({ type: 'ADD_ADDRESS', address }),
    updateAddress: (address) => dispatch({ type: 'UPDATE_ADDRESS', address }),
    deleteAddress: (id) => dispatch({ type: 'DELETE_ADDRESS', id }),
    addOrder: (order) => dispatch({ type: 'ADD_ORDER', order }),
    updateOrderStatus: (orderId, status) => dispatch({ type: 'UPDATE_ORDER_STATUS', orderId, status }),
    cancelOrder: (orderId) => dispatch({ type: 'CANCEL_ORDER', orderId }),
    applyCoupon: (code) => dispatch({ type: 'APPLY_COUPON', code }),
    cartCount,
    cartTotal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
