import AsyncStorage from "@react-native-async-storage/async-storage";


// Helper to parse JSON safely
async function getItem(key: string) {
const value = await AsyncStorage.getItem(key);
return value ? JSON.parse(value) : null;
}


async function setItem(key: string, data: any) {
await AsyncStorage.setItem(key, JSON.stringify(data));
}

export const orderService = {
async getAll() {
return (await getItem("orders")) || [];
},


async create(order: any) {
const orders = await this.getAll();
const newOrder = {
id: Date.now(),
createdAt: new Date().toISOString(),
status: "pendente",
...order
};
orders.push(newOrder);
await setItem("orders", orders);
return newOrder;
},


async update(id: number, data: any) {
const orders = await this.getAll();
const updated = orders.map((o: any) => (o.id === id ? { ...o, ...data } : o));
await setItem("orders", updated);
},


async remove(id: number) {
const orders = await this.getAll();
const filtered = orders.filter((o: any) => o.id !== id);
await setItem("orders", filtered);
}
};