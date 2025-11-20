// Services for WEB mode using AsyncStorage fallback


import AsyncStorage from "@react-native-async-storage/async-storage";


// Helper to parse JSON safely
async function getItem(key: string) {
const value = await AsyncStorage.getItem(key);
return value ? JSON.parse(value) : null;
}


async function setItem(key: string, data: any) {
await AsyncStorage.setItem(key, JSON.stringify(data));
}