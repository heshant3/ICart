import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Screen/Navigation";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import {
  useFonts,
  Inter_600SemiBold,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_300Light,
    Inter_600SemiBold,
  });

  useEffect(() => {
    // Hide splash screen after 2 seconds
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    // Return a loading indicator or null while fonts are loading
    return null;
  }
  return <Navigation />;
};
export default App;
