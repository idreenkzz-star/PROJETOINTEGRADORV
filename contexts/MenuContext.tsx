import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, Order, OrderItem } from '@/types/menu';

interface MenuContextType {
  menuItems: MenuItem[];
  orders: Order[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
  addOrder: (items: OrderItem[], customerName: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela, manjericão fresco',
      price: 45.90,
      category: 'Pizza',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    },
    {
      id: '2',
      name: 'Hambúrguer Artesanal',
      description: 'Pão brioche, blend 180g, queijo cheddar, bacon',
      price: 32.90,
      category: 'Hambúrguer',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    },
    {
      id: '3',
      name: 'Sushi Combinado',
      description: '20 peças variadas de sushi e sashimi',
      price: 89.90,
      category: 'Japonês',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      items: [
        {
          menuItem: menuItems[0],
          quantity: 2,
        },
      ],
      total: 91.80,
      status: 'pending',
      customerName: 'João Silva',
      createdAt: new Date(),
    },
  ]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addOrder = (items: OrderItem[], customerName: string) => {
    const total = items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      status: 'pending',
      customerName,
      createdAt: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        orders,
        addMenuItem,
        removeMenuItem,
        addOrder,
        updateOrderStatus,
      }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
