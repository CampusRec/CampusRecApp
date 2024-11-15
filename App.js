import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './screens/MapScreen';
import GamesScreen from './screens/GamesScreen';
import TeamsScreen from './screens/TeamsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = 'map-outline';
            } else if (route.name === 'Games') {
              iconName = 'list-outline';
            } else if (route.name === 'Teams') {
              iconName = 'people-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fdd835',
          tabBarInactiveTintColor: '#ffffff',
          tabBarStyle: { backgroundColor: '#121212' },
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
