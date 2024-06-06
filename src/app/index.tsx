import React, { useState, useEffect } from "react";
import { Text, StatusBar } from "react-native";
import { useRootNavigationState } from "expo-router";
import { COLORS } from "@/constants/theme";
import IntroSlider from "@/components/intro-slider";
import { useAuth } from "@/contexts/authContext";

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);
  const { isLoggedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (isLoggedIn) {
      setShowHomePage(true);
    }
  }, [isLoggedIn]);

  if (!rootNavigationState?.key) return null;

  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor("#063b6d");

  if (!showHomePage) {
    return <IntroSlider setShowHomePage={setShowHomePage} />;
  }

  return (
    <Text>Hello, World!</Text>
  );
}
