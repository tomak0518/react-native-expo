import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="/login" options={{ headerShown: false }} />
        <Stack.Screen name="/regester" options={{ headerShown: false }} />
        <Stack.Screen name="/forget" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
