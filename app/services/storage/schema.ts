import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

let db: any = null;

if (Platform.OS !== "web") {
  // Somente mobile usa SQLite
  db = SQLite.openDatabaseSync("restaurant.db");
}

export { db };

/**
 * Inicializa todas as tabelas do SQLite (somente no mobile)
 */
export async function initDatabase() {
  if (Platform.OS === "web") {
    console.log("📌 Rodando na WEB → SQLite desabilitado (usando AsyncStorage)");
    return;
  }

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
      imageUri TEXT,
      categoryId INTEGER,
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientId INTEGER,
      itemsJson TEXT NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (clientId) REFERENCES clients(id)
    );
  `);
}
