
import React,{ useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './src/screens/SplashScreen'; // ✅ Import your screen
import WelcomeScreen from './src/screens/WelcomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import JobDetailScreen from './src/screens/JobDetailScreen';
import GoalSettingsScreen from './src/screens/GoalSettingScreen';
import XpComingSoon from './src/screens/XpComingSoon';

const Stack = createNativeStackNavigator();

const App = () => {
  console.log("👋 App.js is running!");

  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailScreen} />
        <Stack.Screen name="GoalSettings" component={GoalSettingsScreen} />
        <Stack.Screen name="XpComingSoon" component={XpComingSoon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;