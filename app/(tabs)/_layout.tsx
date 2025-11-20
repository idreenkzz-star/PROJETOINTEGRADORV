import { Tabs } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import {
  ShoppingBag,
  User,
  Utensils,
  ClipboardList,
  LogOut,
} from "lucide-react-native";

export default function TabsLayout() {
  const { userType } = useAuth();

  return (
    <Tabs screenOptions={{ headerShown: false }}>

      {/* CARDÁPIO: aparece para todos */}
      <Tabs.Screen
        name="client"
        options={{
          title: "Cardápio",
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={size} />
          ),
        }}
      />

      {/* LOGIN: aparece apenas para quem NÃO está logado */}
      {userType === null && (
        <Tabs.Screen
          name="login"
          options={{
            title: "Entrar",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      )}

      {/* ABAS DO ADMIN */}
      {userType === "admin" && (
        <>
          <Tabs.Screen
            name="restaurant"
            options={{
              title: "Gerenciar",
              tabBarIcon: ({ color, size }) => (
                <Utensils color={color} size={size} />
              ),
            }}
          />

          <Tabs.Screen
            name="pedido"
            options={{
              title: "Pedidos",
              tabBarIcon: ({ color, size }) => (
                <ClipboardList color={color} size={size} />
              ),
            }}
          />

          {/* SAIR */}
          <Tabs.Screen
            name="logout"
            options={{
              title: "Sair",
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
