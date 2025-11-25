import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuItem, Order, OrderItem } from "@/types/menu";

interface MenuContextType {
  menuItems: MenuItem[];
  orders: Order[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  removeMenuItem: (id: string) => void;
  updateMenuItem: (id: string, updated: Partial<Omit<MenuItem, "id">>) => void;
  addOrder: (items: OrderItem[], customerName: string) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  reload: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const STORAGE_KEY_MENU = "@myapp:menuItems";
const STORAGE_KEY_ORDERS = "@myapp:orders";

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Carregar do AsyncStorage no mount
  useEffect(() => {
    (async () => {
      try {
        const menuJson = await AsyncStorage.getItem(STORAGE_KEY_MENU);
        const ordersJson = await AsyncStorage.getItem(STORAGE_KEY_ORDERS);

        if (menuJson) {
          setMenuItems(JSON.parse(menuJson));
        } else {
          // opcional: inicializar com alguns itens default  
          setMenuItems([]);
        }

        if (ordersJson) {
          setOrders(JSON.parse(ordersJson));
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error loading storage", error);
      }
    })();
  }, []);

  // Sempre que menuItems mudar, salva
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menuItems)).catch((e) =>
      console.error("Error saving menuItems", e)
    );
  }, [menuItems]);

  // Sempre que orders mudar, salva
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders)).catch((e) =>
      console.error("Error saving orders", e)
    );
  }, [orders]);

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = { ...item, id: Date.now().toString() };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMenuItem = (
    id: string,
    updated: Partial<Omit<MenuItem, "id">>
  ) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      )
    );
  };

  const addOrder = (items: OrderItem[], customerName: string) => {
    const total = items.reduce(
      (sum, i) => sum + i.menuItem.price * i.quantity,
      0
    );
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      status: "pending",
      customerName,
      createdAt: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const reload = async () => {
    try {
      const menuJson = await AsyncStorage.getItem(STORAGE_KEY_MENU);
      const ordersJson = await AsyncStorage.getItem(STORAGE_KEY_ORDERS);
      if (menuJson) setMenuItems(JSON.parse(menuJson));
      if (ordersJson) setOrders(JSON.parse(ordersJson));
    } catch (error) {
      console.error("Error reloading storage", error);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        orders,
        addMenuItem,
        removeMenuItem,
        updateMenuItem,
        addOrder,
        updateOrderStatus,
        reload,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu(): MenuContextType {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return ctx;
}
