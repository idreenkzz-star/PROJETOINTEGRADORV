import AsyncStorage from "@react-native-async-storage/async-storage";


// Helper to parse JSON safely
async function getItem(key: string) {
const value = await AsyncStorage.getItem(key);
return value ? JSON.parse(value) : null;
}


async function setItem(key: string, data: any) {
await AsyncStorage.setItem(key, JSON.stringify(data));
}

export const categoryService = {
async getAll() {
return (await getItem("categories")) || [];
},


async create(name: string) {
const categories = await this.getAll();
const newCat = { id: Date.now(), name };
categories.push(newCat);
await setItem("categories", categories);
return newCat;
},


async update(id: number, data: any) {
const cats = await this.getAll();
const updated = cats.map((c: any) => (c.id === id ? { ...c, ...data } : c));
await setItem("categories", updated);
},


async remove(id: number) {
const cats = await this.getAll();
const filtered = cats.filter((c: any) => c.id !== id);
await setItem("categories", filtered);
}
};