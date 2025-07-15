// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native';

// const HeaderStats = ({ streak, xp }) => {
//   return (
//     <View style={styles.header}>
//       <View style={styles.tag}>

//         <Image
//           source={require('../assets/images/StreakIcon.png')}
//           style={styles.icon}
//         />


//         <Text style={styles.tagText}> {streak} days</Text>
//       </View>
//       <View style={styles.tag}>
//         <Image
//           source={require('../assets/images/reward.png')}
//           style={styles.icon}
//         />
//         <Text style={styles.tagText}>{xp} XP</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 16,
//     marginTop: 20,
//      borderRadius:0,
//      borderColor:'#d3d3d3',
//     borderWidth: 0.2,               // <-- Required for border to show
//     padding: 10,
//     marginBottom:20,
//   },
//   tag: {
    
   
//   paddingBottom:5,
//   paddingHorizontal: 12,
//   flexDirection: 'row',     // ✅ ensures image + text go side by side
//   alignItems: 'center',
//   },
//   tagText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
// });

// export default HeaderStats;


import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // 🔑 Required for navigation

const HeaderStats = ({ streak, xp }) => {
  const navigation = useNavigation();

  const handleXpPress = () => {
    navigation.navigate('XpComingSoon');
  };

  return (
    <View style={styles.header}>
      <View style={styles.tag}>
        <Image
          source={require('../assets/images/StreakIcon.png')}
          style={styles.icon}
        />
        <Text style={styles.tagText}> {streak} days</Text>
      </View>

      <TouchableOpacity style={styles.tag} onPress={handleXpPress}>
        <Image
          source={require('../assets/images/reward.png')}
          style={styles.icon}
        />
        <Text style={styles.tagText}>{xp} XP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 0,
    borderColor: '#d3d3d3',
    borderWidth: 0.2,
    padding: 10,
    marginBottom: 20,
  },
  tag: {
    paddingBottom: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default HeaderStats;
