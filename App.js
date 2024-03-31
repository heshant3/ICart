import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Screen/Navigation";
// import Order from "./Screen/Order";
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

  if (!fontsLoaded) {
    // Return a loading indicator or null while fonts are loading
    return null;
  }
  return <Navigation />;
};
export default App;
