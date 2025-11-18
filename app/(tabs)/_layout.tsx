import { Tabs } from 'expo-router';
import { Store, ShoppingBag, User, Receipt } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
       <Tabs.Screen
        name="restaurant"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Store color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="client"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Pedidos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Receipt color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
