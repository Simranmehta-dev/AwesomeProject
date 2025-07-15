import React , {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Platform, NativeModules, KeyboardAvoidingView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

// const GoalSettingScreen = ({navigation}) => {
//    const [input, setInput] = useState('');

//     // ✅ Load previously saved goal on mount
//   useEffect(() => {
//     const loadGoal = async () => {
//       const saved = await AsyncStorage.getItem('jobsPerDay');
//       if (saved) setInput(saved);
//     };
//     loadGoal();
//   }, []);

//    const isValid = () => {
//     const num = parseInt(input);
//     return !isNaN(num) && num > 0;
//   };

//   const goToNextScreen = async () => {
//    // navigation.navigate('Calendar', { userInput: input });
//      if (isValid()) {
//        console.log("🎯 Saving this input:", input);
//        await AsyncStorage.setItem('jobsPerDay', input);
//        const check = await AsyncStorage.getItem('jobsPerDay');
//        console.log("✅ Saved to AsyncStorage:", check);
//       //navigation.navigate('Calendar', { userInput: input });
//       navigation.goBack();
//     }
//   };

//   return (
//     <View style={styles.container}>

//     <View style={styles.topSection}>

//          <Image
//         source={require('../assets/images/MobileWelcomeImage.png')}
//         style={styles.image}
//       />

//       <Text style={styles.welcomeText}>Change your daily goal</Text>
//           <Text style={styles.description}>
//             Let's set your daily job application target. We recommend at least 3 per day for momentum!
//           </Text>

//     </View>
//      <View style={styles.bottomSection}>
//       <Text style={styles.jobs}>Jobs/Days</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter jobs per day."
//         placeholderTextColor="#ccc"
//         keyboardType="numeric" 
//         value={input}
//         onChangeText={setInput}
//       />

//        <CustomButton 
//           onPress={goToNextScreen} 
//           text="Continue" 
//           disabled={!isValid()} 
//         />

     

//     </View>
//     </View>
//   );
// };

// export default GoalSettingScreen;

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
         
//     },

//   topSection:{
//    backgroundColor:'#1A1A1A',
//     //backgroundColor:'#FF69B4',
//     flex: 1.2,
//     justifyContent: 'center',
//     alignItems: 'center',
    
   
//   },
//   image:{
//    width: 155.85,   // adjust based on your design
//     height: 155.85,
//     marginLeft:200,
//     marginRight:20,
    

//   },
//    welcomeText: {
//     fontSize: 30,
//     color: '#fff',
//     fontWeight: '600',
//     width:323,
//     // height:46,
   
//     fontFamily: 'PlayfairDisplay-Regular',
//     lineHeight:61,
//     letterSpacing:0.4,
    
//   },
//   description: {
//     width:323,
//     color: '#ccc',
//     fontSize: 14,
//     marginBottom:8,
//     lineHeight: 20,
    
//   },




//   bottomSection:{
//    backgroundColor: '#fff',
//     flex: 1.8,
//     padding: 20,
//     justifyContent: 'flex-start',
//   },

//   jobs:{
//     fontSize: 20,
//     fontFamily: 'PlayfairDisplay-Regular',
//      width:323,
//      paddingLeft:25,
//   },
//   input:{
//     height: 50,           // ⬆️ taller box
//     width: '90%',         // ⬅️ wider box relative to screen width
//     marginTop:15,
//     margin: 25,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 15,          // more inner spacing
     
//     // borderWidth: 1,
//     // padding: 10,
//     // marginBottom: 20,

//   },
//   button: {
//   backgroundColor: '#000',
//   paddingVertical: 12,
//   paddingHorizontal: 20,
//   borderRadius: 4,
//   alignSelf: 'flex-start',  // left aligned
//   marginLeft: 25,           // align with TextInput
//   marginTop: 320,
// },

// buttonContent: {
//   flexDirection: 'row',
//   alignItems: 'center',
// },

// buttonText: {
//   color: '#fff',
//   fontSize: 13,
//   marginRight: 6,
//   fontFamily: 'PlayfairDisplay-Regular',
// },

// arrow: {
//   color: '#fff',
//   fontSize: 16,
// },
// buttonDisabled: {
//   backgroundColor: '#aaa', // lighter to indicate it's disabled
// },

 
// });


// const GoalSettingScreen = ({ navigation }) => {
//   const [goal, setGoal] = useState(1); // Default goal is 1 (Change here to use 'goal' instead of 'input') 

//   // ✅ Load previously saved goal on mount
//   useEffect(() => {
//     const loadGoal = async () => {
//       const savedGoal = await AsyncStorage.getItem('jobsPerDay'); // Change here: Load 'jobsPerDay' from AsyncStorage
//       if (savedGoal) setGoal(parseInt(savedGoal, 10)); // Change here: Parse the value as an integer and set it
//     };
//     loadGoal();
//   }, []);

//   const isValid = () => { // Change here: Check if the goal is valid (positive integer)
//     return goal > 0;  // Ensure the goal is a positive integer
//   };

//   const goToNextScreen = async () => {
//     // navigation.navigate('Calendar', { userInput: input });
//     if (isValid()) {
//       console.log("🎯 Saving this input:", goal); // Change here: Log the 'goal' instead of 'input'
//       await AsyncStorage.setItem('jobsPerDay', goal.toString()); // Change here: Save the goal as a string in AsyncStorage
//       const check = await AsyncStorage.getItem('jobsPerDay');
//       console.log("✅ Saved to AsyncStorage:", check);
//       //navigation.navigate('Calendar', { userInput: input });
//       navigation.goBack();
//     }
//   };

//   return (
//     <View style={styles.container}>

//       <View style={styles.topSection}>

//         <Image
//           source={require('../assets/images/MobileWelcomeImage.png')}
//           style={styles.image}
//         />

//         <Text style={styles.welcomeText}>Change your daily goal</Text>
//         <Text style={styles.description}>
//           Let's set your daily job application target. We recommend at least 3 per day for momentum!
//         </Text>

//       </View>
//       <View style={styles.bottomSection}>
//         <Text style={styles.jobs}>Jobs/Days</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter jobs per day."
//           placeholderTextColor="#ccc"
//           keyboardType="numeric"
//           value={goal.toString()} // Change here: Bind 'goal' to the input field
//           onChangeText={(text) => setGoal(parseInt(text))} // Change here: Update 'goal' as an integer
//         />

//         <CustomButton
//           onPress={goToNextScreen}
//           text="Continue"
//           disabled={!isValid()}
//         />

//       </View>
//     </View>
//   );
// };

// export default GoalSettingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   topSection: {
//     backgroundColor: '#1A1A1A',
//     flex: 1.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 155.85,   // adjust based on your design
//     height: 155.85,
//     marginLeft: 200,
//     marginRight: 20,
//   },
//   welcomeText: {
//     fontSize: 30,
//     color: '#fff',
//     fontWeight: '600',
//     width: 323,
//     fontFamily: 'PlayfairDisplay-Regular',
//     lineHeight: 61,
//     letterSpacing: 0.4,
//   },
//   description: {
//     width: 323,
//     color: '#ccc',
//     fontSize: 14,
//     marginBottom: 8,
//     lineHeight: 20,
//   },

//   bottomSection: {
//     backgroundColor: '#fff',
//     flex: 1.8,
//     padding: 20,
//     justifyContent: 'flex-start',
//   },

//   jobs: {
//     fontSize: 20,
//     fontFamily: 'PlayfairDisplay-Regular',
//     width: 323,
//     paddingLeft: 25,
//   },
//   input: {
//     height: 50,           // ⬆️ taller box
//     width: '90%',         // ⬅️ wider box relative to screen width
//     marginTop: 15,
//     margin: 25,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 15,          // more inner spacing
//   },
//   button: {
//     backgroundColor: '#000',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 4,
//     alignSelf: 'flex-start',  // left aligned
//     marginLeft: 25,           // align with TextInput
//     marginTop: 320,
//   },

//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 13,
//     marginRight: 6,
//     fontFamily: 'PlayfairDisplay-Regular',
//   },

//   arrow: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   buttonDisabled: {
//     backgroundColor: '#aaa', // lighter to indicate it's disabled
//   },
// });


const GoalSettingScreen = ({ navigation }) => {
  const [goal, setGoal] = useState(1); // Default goal is 1 (keeping it as number instead of string)

  // ✅ Load previously saved goal on mount
  useEffect(() => {
    const loadGoal = async () => {
      const savedGoal = await AsyncStorage.getItem('jobsPerDay'); // Load 'jobsPerDay' from AsyncStorage
      if (savedGoal) setGoal(parseInt(savedGoal, 10)); // Parse the value as an integer and set it
    };
    loadGoal();
  }, []);

  // ✅ Validity check for the goal input
  const isValid = () => {
    return goal > 0; // Ensure the goal is a positive integer
  };

  // ✅ Handle saving the goal
  // const goToNextScreen = async () => {
  //   if (isValid()) {
  //     console.log("🎯 Saving this goal:", goal); // Logging the goal
  //     await AsyncStorage.setItem('jobsPerDay', goal.toString()); // Save the goal as a string in AsyncStorage
  //     const check = await AsyncStorage.getItem('jobsPerDay');
  //     console.log("✅ Saved to AsyncStorage:", check);
  //     navigation.goBack(); // Go back after saving
  //   }
  // };

//   const goToNextScreen = async () => {
//   if (isValid()) {
//     console.log("🎯 Saving this input:", goal);
//     await AsyncStorage.setItem('jobsPerDay', goal.toString());
//     const check = await AsyncStorage.getItem('jobsPerDay');
//     console.log("✅ Saved to AsyncStorage:", check);

//     // ✅ Trigger widget update here
//     if (Platform.OS === 'android') {
//       try {
//         NativeModules.WidgetUpdateModule.setJobStats(parseInt(goal), 0); // 0 for jobs completed
//         console.log(`📲 Widget updated with goal: ${goal}`);
//       } catch (err) {
//         console.error("❌ Failed to update widget:", err);
//       }
//     }

//     navigation.goBack();
//   }
// };

const goToNextScreen = async () => {
  if (isValid()) {
    console.log("🎯 Saving this input:", goal);
    await AsyncStorage.setItem('jobsPerDay', goal.toString());
    const check = await AsyncStorage.getItem('jobsPerDay');
    console.log("✅ Saved to AsyncStorage:", check);

    // 🧠 Get today's completed jobs before widget update
    const today = new Date().toISOString().split('T')[0];
    const jobsRaw = await AsyncStorage.getItem(`jobs-${today}`);
    const parsedJobs = jobsRaw ? JSON.parse(jobsRaw) : [];
    const completed = parsedJobs.filter(j => j.status === 'DONE').length;

    console.log(`📊 Completed jobs today: ${completed}`);

    // ✅ Update widget with both goal and completed
    if (Platform.OS === 'android') {
      try {
        NativeModules.WidgetUpdateModule.setJobStats(goal, completed);
        console.log(`📲 Widget updated → Goal: ${goal}, Completed: ${completed}`);
      } catch (err) {
        console.error("❌ Failed to update widget:", err);
      }
    }

    navigation.goBack();
  }
};



  // ✅ Handle text input change and validation for goal
  const handleChange = (text) => {
    if (text === '') {
      setGoal(0); // Allow empty input to reset goal (optional: reset to default value)
    } else {
      const parsedGoal = parseInt(text, 10); // Parse the text as an integer
      if (!isNaN(parsedGoal)) {
        setGoal(parsedGoal); // Set parsed goal only if it's a valid number
      }
    }
  };

  return (
     
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
     <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
    <View style={styles.container}>

      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/MobileWelcomeImage.png')}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>Change your daily goal</Text>
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
          keyboardType="numeric"
          value={goal.toString()} // Bind 'goal' to the input field
          onChangeText={handleChange} // Handle input change and validation
        />

        <CustomButton
          onPress={goToNextScreen}
          text="Continue"
          disabled={!isValid()} // Disable button if goal is invalid
        />

      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GoalSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSection: {
    backgroundColor: '#1A1A1A',
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 155.85,   // adjust based on your design
    height: 155.85,
    marginLeft: 200,
    marginRight: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '600',
    width: 323,
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: 61,
    letterSpacing: 0.4,
  },
  description: {
    width: 323,
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },

  bottomSection: {
    backgroundColor: '#fff',
    flex: 1.8,
    padding: 20,
    justifyContent: 'flex-start',
  },

  jobs: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Regular',
    width: 323,
    paddingLeft: 25,
  },
  input: {
    height: 50,           // ⬆️ taller box
    width: '90%',         // ⬅️ wider box relative to screen width
    marginTop: 15,
    margin: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,          // more inner spacing
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