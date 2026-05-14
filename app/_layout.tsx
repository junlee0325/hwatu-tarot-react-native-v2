import { AudioProvider } from "@/context/AudioContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { MuteProvider } from "@/context/MuteContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ width: "100%" }}>
      <LanguageProvider>
        <MuteProvider>
          <AudioProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </AudioProvider>
        </MuteProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
