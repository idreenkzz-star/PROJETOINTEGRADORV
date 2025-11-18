import { Tabs } from 'expo-router';
import { Store, ShoppingBag, User, Receipt, LogOut  } from 'lucide-react-native';
import { useAuth } from "@/contexts/AuthContext";

export default function TabLayout() {
  const { logged } = useAuth();
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
          tabBarIcon: ({ color, size }) =>
            logged ? (
              <LogOut color={color} size={size} />
            ) : (
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
