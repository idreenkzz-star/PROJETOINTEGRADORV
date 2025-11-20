import { useEffect, useState } from "react";
import { ProductService } from "@/services/web";

export function useProducts() {
  const [products, setProducts] = useState([]);

  async function load() {
    const data = await ProductService.getAll();
    setProducts(data);
  }

  async function add(item: any) {
    await ProductService.create(item);
    await load();
  }

  return { products, add, load };
}
