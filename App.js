import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import Screens
import MapScreen from "./screens/MapScreen";
import GamesScreen from "./screens/GamesScreen";
import TeamsScreen from "./screens/TeamsScreen";
import ProfileScreen from "./screens/ProfileScreen";

// Firebase Initialization (Ensure firebaseConfig.js is correct)
import "./firebaseConfig"; // Initialize Firebase

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Map") {
              iconName = "map";
            } else if (route.name === "Games") {
              iconName = "list";
            } else if (route.name === "Teams") {
              iconName = "people";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1e88e5", // Active tab color
          tabBarInactiveTintColor: "gray",  // Inactive tab color
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Games" component={GamesScreen} />
        <Tab.Screen name="Teams" component={TeamsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
