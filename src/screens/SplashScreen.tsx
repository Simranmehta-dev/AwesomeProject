import React , { useEffect }from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
     const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(StackActions.replace('Welcome'));
    }, 3000); // 2 seconds

    return () => clearTimeout(timer); // Clean up on unmount
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