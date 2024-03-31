import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import CartQr from "./CartQr";
import Order from "./Order";
import History from "./History";
import User from "./User";
import OrderHistory from "./OderHistoryView";
import Login from "./Logging";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Navigation Screens
function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="CartQr"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#6dd051",
        tabBarInactiveTintColor: "#a8a8aa",
        size: 25,
        tabBarStyle: {
          height: 70,
          justifyContent: "center",
          alignContent: "center",
        },
        tabBarIconStyle: {
          marginTop: 10,
          justifyContent: "center",
          alignContent: "center",
        },
        tabBarLabelStyle: { paddingBottom: 10 }, // Change the vertical gap between icon and label
        // tabBarLabelStyle: { paddingBottom: 10 }, // Change the vertical gap between icon and label
      }}
    >
      <Tab.Screen
        name="CartQr"
        component={CartQr}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="qr-code-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Uncomment this if you have a login screen */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
