// import { AudioProvider } from "@/context/AudioContext";
// import { LanguageProvider } from "@/context/LanguageContext";
// import { MuteProvider } from "@/context/MuteContext";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider style={{ width: "100%" }}>
//       <LanguageProvider>
//         <MuteProvider>
//           <AudioProvider>
//             <Stack>
//               <Stack.Screen name="index" options={{ headerShown: false }} />
//             </Stack>
//           </AudioProvider>
//         </MuteProvider>
//       </LanguageProvider>
//     </SafeAreaProvider>
//   );
// }

import { AudioProvider } from "@/context/AudioContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { MuteProvider } from "@/context/MuteContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// 1. Prevent native splash screen from hiding immediately
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for 1.5 seconds so people can admire the artwork.
        // If you move your useFonts hook to this file later, you can wait for them here.
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // 2. Hide the tiny native blank screen
      SplashScreen.hideAsync();

      // 3. Fade out our custom massive image overlay
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300, // 800ms smooth fade out
        useNativeDriver: true,
      }).start();
    }
  }, [appIsReady, fadeAnim]);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#000000" }}>
      <LanguageProvider>
        <MuteProvider>
          <AudioProvider>
            {/* Wrap the Stack and Splash in a View to allow absolute positioning */}
            <View style={{ flex: 1 }}>
              {/* Your actual app content */}
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
              </Stack>

              {/* Our Custom Full-Screen Splash Overlay */}
              <Animated.View
                pointerEvents="none" // Ensures users can't click on the invisible image after it fades
                style={[
                  StyleSheet.absoluteFill,
                  {
                    opacity: fadeAnim,
                    backgroundColor: "#000000", // Matches your app.json background
                    zIndex: 999, // Keeps it on top of the Stack
                  },
                ]}
              >
                <Image
                  source={require("../assets/splash.png")} // Assuming your poster is here
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </Animated.View>
            </View>
          </AudioProvider>
        </MuteProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
