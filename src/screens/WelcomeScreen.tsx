import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';


const WelcomeScreen = () => {
  return (
    <View style={styles.container}>

    <View style={styles.topSection}>

         <Image
        source={require('../assets/images/MobileWelcomeImage.png')}
        style={styles.image}
      />

      <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.description}>
            Let's set your daily job application target. We recommend at least 3 per day for momentum!
          </Text>

    </View>
     <View style={styles.bottomSection}>
      <Text style={styles.jobs}>Jobs/Days</Text>
    </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
         
    },

  topSection:{
   backgroundColor:'#1A1A1A',
    //backgroundColor:'#FF69B4',
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    
   
  },
  image:{
   width: 155.85,   // adjust based on your design
    height: 155.85,
    marginLeft:200,
    marginRight:20,
    

  },
   welcomeText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '600',
    width:323,
    // height:46,
   
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight:61,
    letterSpacing:0.4,
    
  },
  description: {
    width:323,
    color: '#ccc',
    fontSize: 14,
    marginBottom:8,
    lineHeight: 20,
    
  },




  bottomSection:{
   backgroundColor: '#fff',
    flex: 1.8,
    padding: 20,
    justifyContent: 'flex-start',
  },

  jobs:{
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Regular',
  },
 
});
