import React , {useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WelcomeScreen = ({navigation}) => {
   const [input, setInput] = useState('');

   const isValid = () => {
    const num = parseInt(input);
    return !isNaN(num) && num > 0;
  };

  const goToNextScreen = async () => {
   // navigation.navigate('Calendar', { userInput: input });
     if (isValid()) {
      await AsyncStorage.setItem('jobsPerDay', input);
      navigation.navigate('Calendar', { userInput: input });
    }
  };

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

      <TextInput
        style={styles.input}
        placeholder="Enter jobs per day."
        placeholderTextColor="#ccc"
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity style={[styles.button, !isValid() && styles.buttonDisabled]} onPress={goToNextScreen} disabled={!isValid()}>
    <View style={styles.buttonContent}>
      <Text style={styles.buttonText}>Continue</Text>
      <Text style={styles.arrow}>→</Text>
    </View>
  </TouchableOpacity>

   {/* <TouchableOpacity
          style={[styles.button, !isValid() && styles.buttonDisabled]}
          onPress={goToNextScreen}
          disabled={!isValid()}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Continue</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity> */}

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
     width:323,
     paddingLeft:25,
  },
  input:{
    height: 50,           // ⬆️ taller box
    width: '90%',         // ⬅️ wider box relative to screen width
    marginTop:15,
    margin: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,          // more inner spacing
     
    // borderWidth: 1,
    // padding: 10,
    // marginBottom: 20,

  },
  button: {
  backgroundColor: '#000',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 4,
  alignSelf: 'flex-start',  // left aligned
  marginLeft: 25,           // align with TextInput
  marginTop: 320,
},

buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
},

buttonText: {
  color: '#fff',
  fontSize: 13,
  marginRight: 6,
  fontFamily: 'PlayfairDisplay-Regular',
},

arrow: {
  color: '#fff',
  fontSize: 16,
},
buttonDisabled: {
  backgroundColor: '#aaa', // lighter to indicate it's disabled
},

 
});
