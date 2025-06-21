import React , { useEffect }from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
     const navigation = useNavigation<any>();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.dispatch(StackActions.replace('Welcome'));
  //   }, 3000); // 2 seconds

  //   return () => clearTimeout(timer); // Clean up on unmount
  // }, []);

   useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const jobsPerDay = await AsyncStorage.getItem('jobsPerDay');

        // Wait for 2–3 seconds for splash effect
        setTimeout(() => {
          if (jobsPerDay) {
            // If user already set target, go to Calendar
            navigation.dispatch(StackActions.replace('Calendar', { userInput: jobsPerDay }));
          } else {
            // Otherwise go to Welcome screen
            navigation.dispatch(StackActions.replace('Welcome'));
          }
        }, 3000); // 3 seconds splash delay
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
        navigation.dispatch(StackActions.replace('Welcome')); // fallback
      }
    };

    checkFirstLaunch();
  }, []);


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.logo}
      />
      
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Pure black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 208,
    height: 285.93,
    resizeMode: 'contain',
    marginBottom: 20,
  },
 
});




// import React from 'react';
// import {Text, View} from 'react-native';

// const SplashScreen = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Try editing me! hellohii🎉</Text>
//     </View>
//   );
// };

// export default SplashScreen;