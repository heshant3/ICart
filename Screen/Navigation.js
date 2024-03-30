import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import CartQr from "./CartQr";
import Order from "./Order";
import History from "./History";
import User from "./User";
import Login from "./Logging";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Navigation Screens
function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="CartQr"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FDAE03",
        tabBarInactiveTintColor: "#a8a8aa",
        tabBarStyle: { height: 70 },
      }}
    >
      <Tab.Screen
        name="CartQr"
        component={CartQr}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="file-document-multiple"
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  marginBottom: 50,

                  width: Platform.OS == "ios" ? 55 : 55,
                  height: Platform.OS == "ios" ? 55 : 55,

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="grid" size={55} color={color} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="user" size={25} color={color} />
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
          tabBarShowLabel: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
