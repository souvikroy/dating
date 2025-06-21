import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import SwipeScreen from './src/screens/SwipeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LiveRoomsScreen from './src/screens/LiveRoomsScreen';
import LiveRoomScreen from './src/screens/LiveRoomScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main app tabs for logged-in users
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Discover') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Live Rooms') {
            iconName = focused ? 'mic' : 'mic-outline';
          } else if (route.name === 'Matches') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Discover" component={SwipeScreen} />
      <Tab.Screen name="Live Rooms" component={LiveRoomsScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          // Auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : !isProfileComplete ? (
          // Profile setup for new users
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        ) : (
          // Main app screens
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen} 
              options={{ headerShown: true, title: 'Chat' }}
            />
            <Stack.Screen 
              name="LiveRoom" 
              component={LiveRoomScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{ headerShown: true, title: 'Settings' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
