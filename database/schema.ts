import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("relatosBurger.db");

/**
 * Inicializa todas as tabelas do SQLite
 */
export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      street TEXT,
      number TEXT,
      neighborhood TEXT,
      complement TEXT
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      imageUri TEXT,                -- URI local da imagem
      categoryId INTEGER,
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientId INTEGER,
      itemsJson TEXT NOT NULL,      -- lista de itens do carrinho em JSON
      status TEXT NOT NULL,         -- "pendente", "preparando", "entregue"
      createdAt TEXT NOT NULL,      -- ISO 8601 timestamp
      FOREIGN KEY (clientId) REFERENCES clients(id)
    );
  `);
}
