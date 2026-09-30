"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

export interface ConfiguredSpecs {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  warranty: string;
}

export interface CartItem {
  id: string;
  laptopId: string;
  name: string;
  slug: string;
  image: string;
  basePrice: number;
  totalPrice: number;
  quantity: number;
  configuredSpecs: ConfiguredSpecs;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isCartOpen: boolean;
  subtotal: number;
  totalItems: number;
  lastAddedToast: string | null;
  clearToast: () => void;
}

const STORAGE_KEY = "tk_laptop_hardware_bag_v1";

const CartContext = createContext<CartContextValue | undefined>(undefined);

function buildCartItemInstanceId(item: Omit<CartItem, "id">): string {
  const { processor, ram, storage, display, warranty } = item.configuredSpecs;
  return `${item.laptopId}::${processor}::${ram}::${storage}::${display}::${warranty}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedToast, setLastAddedToast] = useState<string | null>(null);

  // Hydrate from localStorage on client mount and subscribe to cross-tab storage updates
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch {
        // Ignore storage read errors in restricted environments
      } finally {
        setIsHydrated(true);
      }
    };

    const timerId = window.setTimeout(syncFromStorage, 0);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  // Persist to localStorage whenever items change after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items, isHydrated]);

  const addItem = useCallback((newItem: Omit<CartItem, "id">) => {
    const instanceId = buildCartItemInstanceId(newItem);
    const qtyToAdd = Math.max(1, newItem.quantity || 1);

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === instanceId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        updated[existingIndex] = {
          ...current,
          quantity: current.quantity + qtyToAdd,
          totalPrice: newItem.totalPrice,
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...newItem,
          id: instanceId,
          quantity: qtyToAdd,
        },
      ];
    });

    setLastAddedToast(`${newItem.name} (${newItem.configuredSpecs.ram} / ${newItem.configuredSpecs.storage}) added to bag.`);
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const clearToast = useCallback(() => setLastAddedToast(null), []);

  // Auto-dismiss confirmation toast after 4 seconds
  useEffect(() => {
    if (!lastAddedToast) return;
    const timer = setTimeout(() => {
      setLastAddedToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [lastAddedToast]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.totalPrice * item.quantity,
        0
      ),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      isCartOpen,
      subtotal,
      totalItems,
      lastAddedToast,
      clearToast,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      isCartOpen,
      subtotal,
      totalItems,
      lastAddedToast,
      clearToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
