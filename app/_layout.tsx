import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { MenuProvider } from '@/contexts/MenuContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <MenuProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </MenuProvider>
  );
}
