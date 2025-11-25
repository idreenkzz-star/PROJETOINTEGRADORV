export interface MenuItem {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  imagem?: string;
}

const STORAGE_KEY = "cardapio";

// Busca lista completa
export function getCardapio(): MenuItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Salva lista
function saveCardapio(lista: MenuItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// CREATE
export function addItem(item: Omit<MenuItem, "id">) {
  const lista = getCardapio();
  const novoItem = {
    id: Date.now(),
    ...item
  };
  lista.push(novoItem);
  saveCardapio(lista);
  return novoItem;
}

// UPDATE
export function updateItem(id: number, dadosAtualizados: Partial<MenuItem>) {
  const lista = getCardapio();
  const index = lista.findIndex(i => i.id === id);
  if (index === -1) return null;

  lista[index] = { ...lista[index], ...dadosAtualizados };
  saveCardapio(lista);
  return lista[index];
}

// DELETE
export function deleteItem(id: number) {
  const lista = getCardapio().filter(i => i.id !== id);
  saveCardapio(lista);
}
