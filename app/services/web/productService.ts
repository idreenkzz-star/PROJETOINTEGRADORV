import AsyncStorage from "@react-native-async-storage/async-storage";


// Helper to parse JSON safely
async function getItem(key: string) {
const value = await AsyncStorage.getItem(key);
return value ? JSON.parse(value) : null;
}


async function setItem(key: string, data: any) {
await AsyncStorage.setItem(key, JSON.stringify(data));
}

export const productService = {
async getAll() {
return (await getItem("products")) || [];
},


async create(product: any) {
const products = await this.getAll();
const newProduct = { id: Date.now(), ...product };
products.push(newProduct);
await setItem("products", products);
return newProduct;
},


async update(id: number, data: any) {
const products = await this.getAll();
const updated = products.map((p: any) => (p.id === id ? { ...p, ...data } : p));
await setItem("products", updated);
},


async remove(id: number) {
const products = await this.getAll();
const filtered = products.filter((p: any) => p.id !== id);
await setItem("products", filtered);
}
};