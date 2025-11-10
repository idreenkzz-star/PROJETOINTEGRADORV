import { Tabs } from 'expo-router';
import { Store, ShoppingBag } from 'lucide-react-native';

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
          title: 'Restaurante',
          tabBarIcon: ({ size, color }) => (
            <Store size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="client"
        options={{
          title: 'Cliente',
          tabBarIcon: ({ size, color }) => (
            <ShoppingBag size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
