import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function LogoutScreen() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    router.replace("/(tabs)/login");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
