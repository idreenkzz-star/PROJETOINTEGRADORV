import { Tabs } from "expo-router";
import { Utensils, ShoppingBag, User, LogOut, ClipboardList } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function TabsLayout() {
  const { userType } = useAuth();
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
        name="cardapio"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={size} />
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

      {/* LOGIN aparece se NÃO estiver logado */}
      {userType === null && (
        <Tabs.Screen
          name="login"
          options={{
            tabBarIcon: ({ color, size }) => (
              <User color={color} size={size} />
            ),
          }}
        />
      )}

       {/* ADMIN: rotas exclusivas */}
      {userType === "admin" && (
        <>
          <Tabs.Screen
            name="restaurant"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Utensils color={color} size={size} />
              ),
            }}
          />

          <Tabs.Screen
            name="orders"
            options={{
              tabBarIcon: ({ color, size }) => (
                <ClipboardList color={color} size={size} />
              ),
            }}
          />

          <Tabs.Screen
            name="login" // mesma rota, mas agora vira LOGOUT
            options={{
              tabBarIcon: ({ color, size }) => (
                <LogOut color={color} size={size} />
              ),
            }}
          />
        </>
      )}

    </Tabs>
  );
}
