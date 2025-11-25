import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuItem, Order, OrderItem } from "@/types/menu";
import uuid from "react-native-uuid";

// Tipos disponíveis no contexto
interface MenuContextType {
  menuItems: MenuItem[];
  orders: Order[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, updated: Partial<Omit<MenuItem, "id">>) => void;
  removeMenuItem: (id: string) => void;

  addOrder: (items: OrderItem[], customerName: string) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;

  reload: () => Promise<void>;
}

// Criação do contexto
const MenuContext = createContext<MenuContextType | undefined>(undefined);

const STORAGE_KEY_MENU = "@myapp:menuItems";
const STORAGE_KEY_ORDERS = "@myapp:orders";

// Provider
export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Carregar dados na inicialização
  useEffect(() => {
    (async () => {
      try {
        const menuJson = await AsyncStorage.getItem(STORAGE_KEY_MENU);
        const ordersJson = await AsyncStorage.getItem(STORAGE_KEY_ORDERS);

        if (menuJson) {
          setMenuItems(JSON.parse(menuJson));
        }

        if (ordersJson) {
          setOrders(JSON.parse(ordersJson));
        }
      } catch (error) {
        console.error("❌ Erro ao carregar AsyncStorage:", error);
      }
    })();
  }, []);

  // Salvar menuItems sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menuItems)).catch(
      (error) => console.error("❌ Erro ao salvar menuItems:", error)
    );
  }, [menuItems]);

  // Salvar orders sempre que mudar
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders)).catch(
      (error) => console.error("❌ Erro ao salvar orders:", error)
    );
  }, [orders]);

  // Criar novo item no cardápio
  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: uuid.v4().toString(), // ID confiável
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  // Editar item
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

  // Remover item
  const removeMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Criar pedido
  const addOrder = (items: OrderItem[], customerName: string) => {
    const total = items.reduce(
      (sum, i) => sum + i.menuItem.price * i.quantity,
      0
    );

    const newOrder: Order = {
      id: uuid.v4().toString(),
      items,
      total,
      status: "pending",
      customerName,
      createdAt: new Date(),
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  // Atualizar status de pedido
  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  // Recarregar manualmente
  const reload = async () => {
    try {
      const menuJson = await AsyncStorage.getItem(STORAGE_KEY_MENU);
      const ordersJson = await AsyncStorage.getItem(STORAGE_KEY_ORDERS);

      if (menuJson) setMenuItems(JSON.parse(menuJson));
      if (ordersJson) setOrders(JSON.parse(ordersJson));
    } catch (error) {
      console.error("❌ Erro ao recarregar AsyncStorage:", error);
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
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("❌ useMenu deve ser usado dentro de <MenuProvider>");
  }
  return context;
}
