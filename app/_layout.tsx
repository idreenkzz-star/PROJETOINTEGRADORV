import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { MenuProvider } from '@/contexts/MenuContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { initDatabase } from "@/services/web/storage";


export default function RootLayout() {
  useFrameworkReady();
  useEffect(() => {
    initDatabase();
  }, []);
  return (
    <AuthProvider>
    <MenuProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </MenuProvider>
    </AuthProvider>
  );
}
