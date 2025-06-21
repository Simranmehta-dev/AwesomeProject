// import React from 'react';
// import {Text, View} from 'react-native';

// const CalendarScreen = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Try editing me! hellohihjgjgji🎉 jkkkkkkkkkkk</Text>
//     </View>
//   );
// };

// export default CalendarScreen;

// src/screens/TestCalendar.tsx



// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const TestCalendar = () => {
//   return (
//     <View style={styles.container}>
//       <Calendar />
//     </View>
//   );
// };

// export default TestCalendar;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
// });



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import StreakAndXp from '../components/StreakAndXp';
import { useNavigation } from '@react-navigation/native';

//import xpIcon from '../assets/images/StreakIcon.png';
const today = new Date();
const todayString = today.toISOString().split('T')[0];

const CalendarScreen = () => {
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const stats = await AsyncStorage.getItem('userStats');
      if (stats) {
        const parsed = JSON.parse(stats);
        setStreak(parsed.streak || 0);
        setXp(parsed.xp || 0);
      }
    } catch (e) {
      console.error('Failed to load user stats:', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Component*/}
      

      <StreakAndXp streak={streak} xp={xp}  />

      {/* Calendar */}
      <View style={styles.card}>
        <Text style={styles.title}>your progress</Text>
        <Calendar
        //style={{ height: 300 }}
         onDayPress={(day) => {
           
            navigation.navigate('JobDetails', { selectedDate: day.dateString });
         }}

         maxDate={todayString}

  //        dayComponent={({ date, state }) => {
  //   const isFuture = date.dateString > todayString;
  //   return (
  //     <View>
  //       <Text style={{ 
  //         color: isFuture ? '#555' : (state === 'today' ? '#28a745' : '#fff'), 
  //         textAlign: 'center' 
  //       }}>
  //         {date.day}
  //       </Text>
  //     </View>
  //   );
  // }}


  dayComponent={({ date, state }) => {
  const isFuture = date.dateString > todayString;
  return (
    <TouchableOpacity
      disabled={isFuture}
      onPress={() => {
        if (!isFuture) {
          navigation.navigate('JobDetails', { selectedDate: date.dateString });
        }
      }}
    >
      <Text
        style={{
          color: isFuture ? '#555' : (state === 'today' ? '#28a745' : '#fff'),
          textAlign: 'center',
          padding: 8,
        }}
      >
        {date.day}
      </Text>
    </TouchableOpacity>
  );
}}

          
          theme={{
            backgroundColor: '#1c1c1e',
            calendarBackground: '#1c1c1e',
            dayTextColor: '#fff',
            monthTextColor: '#fff',
            textSectionTitleColor: '#888',
            arrowColor: '#fff',
            todayTextColor: '#4DB5FF',
          }}

         




        />
      </View>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 12,
  },
  title: {
    color: '#696969',
    fontSize: 16,
    marginBottom: 8,
    marginLeft:21,
  },
  headerWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
  paddingHorizontal: 10,
},
// monthText: {
//   color: '#fff',
//   fontSize: 18,
//   fontWeight: 'bold',
//   flex: 1,
// },
});
