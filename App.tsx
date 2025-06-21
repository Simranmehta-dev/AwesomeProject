// import React from 'react';
// import {Text, View} from 'react-native';

// const YourApp = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Try me</Text>
//     </View>
//   );
// };

// export default YourApp;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen'; // ✅ Import your screen
import WelcomeScreen from './src/screens/WelcomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import JobDetailScreen from './src/screens/JobDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;