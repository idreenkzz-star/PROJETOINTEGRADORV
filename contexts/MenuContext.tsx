import { createContext, useContext } from "react";
import { useProducts } from "@/hooks/useProduct";

const MenuContext = createContext(null as any);

export function MenuProvider({ children }: any) {
  const products = useProducts();

  return (
    <MenuContext.Provider value={{
      items: products.products,
      addMenuItem: products.add,
      deleteMenuItem: products.remove,
      updateMenuItem: products.update,
      reloadMenu: products.load,
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}