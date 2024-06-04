import "../global.css";
import { Slot, SplashScreen, useRouter, useSegments, useRootNavigationState } from "expo-router";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { AuthContextProvider, useAuth } from "@/contexts/authContext";

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const [fontsLoaded, error] = useFonts({
    // Poppins
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),

    // NunitoSans
    "NunitoSans-Black": require("../assets/fonts/NunitoSans/NunitoSans_7pt-Black.ttf"),
    "NunitoSans-BlackItalic": require("../assets/fonts/NunitoSans/NunitoSans_7pt-BlackItalic.ttf"),
    "NunitoSans-Bold": require("../assets/fonts/NunitoSans/NunitoSans_7pt-Bold.ttf"),
    "NunitoSans-BoldItalic": require("../assets/fonts/NunitoSans/NunitoSans_7pt-BoldItalic.ttf"),
    "NunitoSans-ExtraBold": require("../assets/fonts/NunitoSans/NunitoSans_7pt-ExtraBold.ttf"),

    "NunitoSans-ExtraBoldItalic": require("../assets/fonts/NunitoSans/NunitoSans_7pt-ExtraBoldItalic.ttf"),
    "NunitoSans-ExtraLight": require("../assets/fonts/NunitoSans/NunitoSans_7pt-ExtraLight.ttf"),
    "NunitoSans-ExtraLightItalic": require("../assets/fonts/NunitoSans/NunitoSans_7pt-ExtraLightItalic.ttf"),
    "NunitoSans-Italic": require("../assets/fonts/NunitoSans/NunitoSans_7pt-Italic.ttf"),
    "NunitoSans-Light": require("../assets/fonts/NunitoSans/NunitoSans_7pt-Light.ttf"),
    "NunitoSans-LightItalic": require("../assets/fonts/NunitoSans/NunitoSans_7pt-LightItalic.ttf"),
    "NunitoSans-Medium": require("../assets/fonts/NunitoSans/NunitoSans_7pt-Medium.ttf"),
    "NunitoSans-MediumItalic": require("../assets/fonts/NunitoSans/NunitoSans_7pt-MediumItalic.ttf"),
    "NunitoSans-Regular": require("../assets/fonts/NunitoSans/NunitoSans_7pt-Regular.ttf"),
    "NunitoSans-SemiBold": require("../assets/fonts/NunitoSans/NunitoSans_7pt-SemiBold.ttf"),
    "NunitoSans-SemiBoldItalic": require("../assets/fonts/NunitoSans/NunitoSans_7pt-SemiBoldItalic.ttf"),

    // JosefinSans
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans/JosefinSans-Bold.ttf"),
    "JosefinSans-BoldItalic": require("../assets/fonts/JosefinSans/JosefinSans-BoldItalic.ttf"),
    "JosefinSans-ExtraLight": require("../assets/fonts/JosefinSans/JosefinSans-ExtraLight.ttf"),
    "JosefinSans-ExtraLightItalic": require("../assets/fonts/JosefinSans/JosefinSans-ExtraLightItalic.ttf"),
    "JosefinSans-Italic": require("../assets/fonts/JosefinSans/JosefinSans-Italic.ttf"),
    "JosefinSans-Light": require("../assets/fonts/JosefinSans/JosefinSans-Light.ttf"),
    "JosefinSans-LightItalic": require("../assets/fonts/JosefinSans/JosefinSans-LightItalic.ttf"),
    "JosefinSans-Medium": require("../assets/fonts/JosefinSans/JosefinSans-Medium.ttf"),
    "JosefinSans-MediumItalic": require("../assets/fonts/JosefinSans/JosefinSans-MediumItalic.ttf"),
    "JosefinSans-Regular": require("../assets/fonts/JosefinSans/JosefinSans-Regular.ttf"),
    "JosefinSans-SemiBold": require("../assets/fonts/JosefinSans/JosefinSans-SemiBold.ttf"),
    "JosefinSans-SemiBoldItalic": require("../assets/fonts/JosefinSans/JosefinSans-SemiBoldItalic.ttf"),
    "JosefinSans-Thin": require("../assets/fonts/JosefinSans/JosefinSans-Thin.ttf"),
    "JosefinSans-ThinItalic": require("../assets/fonts/JosefinSans/JosefinSans-ThinItalic.ttf"),
  });

  const { isLoggedIn, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    if (typeof isLoggedIn === "undefined") return;
    const inApp = segments[0] == "(tabs)";
    console.log("user: ", user, ", isLoggedIn: ", isLoggedIn, ", inApp: ", inApp);

    // setTimeout(() => {
    if (isLoggedIn && !inApp) {
      // redirect to home
      router.replace("home");
    } else if (!isLoggedIn) {
      // redirect to login
      router.replace("login");
    }
    // }, 1000);

  }, [isLoggedIn]);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}