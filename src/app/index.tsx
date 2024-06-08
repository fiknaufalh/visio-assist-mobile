import React, { useState, useEffect } from "react";
import { Text, StatusBar } from "react-native";
import { useRootNavigationState } from "expo-router";

export default function App() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor("#063b6d");

  return (
    <Text>Hello, World!</Text>
  );
}
