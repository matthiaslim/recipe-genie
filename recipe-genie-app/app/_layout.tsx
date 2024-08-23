import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { configureFonts, MD3LightTheme, PaperProvider, Text, useTheme } from "react-native-paper";
import { useFonts } from 'expo-font';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  const baseFont = {
    fontFamily: 'Montserrat-Regular',
  } as const;

  const fonts = configureFonts({ config: baseFont });

  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#C8102F',
      secondary: '#EF95A4'
    },
    fonts,
  };

  return (
    <ConvexProvider client={convex}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="generateRecipe"
            options={{
              title: "New Recipe",
              headerShown: false
            }}
          />
        </Stack>
      </PaperProvider>
    </ConvexProvider>
  );
}
