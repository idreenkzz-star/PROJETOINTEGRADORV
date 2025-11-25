import { useEffect, useState } from "react";
import { cardapioService } from "@/services/web/cardapioService";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);

  async function load() {
    const data = await cardapioService.getAll();
    setProducts(data);
  }

  async function add(item: any) {
    await cardapioService.create(item);
    await load();
  }

  async function remove(id: number) {
    await cardapioService.delete(id);
    await load();
  }

  async function update(id: number, changes: any) {
    await cardapioService.update(id, changes);
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return { products, add, update, remove, load };
}
