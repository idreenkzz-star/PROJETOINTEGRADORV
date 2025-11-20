import AsyncStorage from "@react-native-async-storage/async-storage";


// Helper to parse JSON safely
async function getItem(key: string) {
const value = await AsyncStorage.getItem(key);
return value ? JSON.parse(value) : null;
}


async function setItem(key: string, data: any) {
await AsyncStorage.setItem(key, JSON.stringify(data));
}

export const clientService = {
async getAll() {
return (await getItem("clients")) || [];
},


async create(client: any) {
const clients = (await this.getAll()) || [];
const newClient = { id: Date.now(), ...client };
clients.push(newClient);
await setItem("clients", clients);
return newClient;
},


async update(id: number, data: any) {
const clients = await this.getAll();
const updated = clients.map((c: any) => (c.id === id ? { ...c, ...data } : c));
await setItem("clients", updated);
},


async remove(id: number) {
const clients = await this.getAll();
const filtered = clients.filter((c: any) => c.id !== id);
await setItem("clients", filtered);
}
};