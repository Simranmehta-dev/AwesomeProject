
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text,Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import StreakAndXp from '../components/StreakAndXp';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import goalIcon from'../assets/images/StreakIcon.png';
import { NativeModules } from 'react-native';

const isTodayOrPast = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const selected = new Date(y, m - 1, d);
  const today = new Date();
  selected.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return selected <= today;
};


//import xpIcon from '../assets/images/StreakIcon.png';
const today = new Date();
const todayString = today.toISOString().split('T')[0];

const CalendarScreen = () => {
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [calendarKey, setCalendarKey] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(1);

  const navigation = useNavigation();

//   const getDayProgress = async (dateString) => {
//   const jobsRaw = await AsyncStorage.getItem(`jobs-${dateString}`);
//   if (!jobsRaw) return 0;
//   const jobs = JSON.parse(jobsRaw);
//   const total = jobs.length || 1;
//   const done = jobs.filter(j => j.status === 'DONE').length;
//   return done / total;
// };

const getDayProgress = async (dateString) => {
  try {
    const jobsRaw = await AsyncStorage.getItem(`jobs-${dateString}`);
    if (!jobsRaw) return 0;

    const jobs = JSON.parse(jobsRaw);
    if (!Array.isArray(jobs) || jobs.length === 0) return 0;

    const done = jobs.filter(j => j.status === 'DONE').length;
    return done / jobs.length;
  } catch (e) {
    console.error('Error getting day progress:', e);
    return 0;
  }
};


  // useEffect(() => {
  //   loadUserStats();
  // }, [streak, xp]);


  useFocusEffect(
  useCallback(() => {
    setCalendarKey(prev => prev + 1);
    loadUserStats();
  }, [])
);


  const loadUserStats = async () => {
  try {
    const stats = await AsyncStorage.getItem('userStats');
    const lastCompletedDate = await AsyncStorage.getItem('lastCompletedDate');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (lastCompletedDate) {
      const lastDate = new Date(lastCompletedDate);
      lastDate.setHours(0, 0, 0, 0);
      const diff = (today - lastDate) / (1000 * 60 * 60 * 24);

      // ⛔️ Reset if missed a full day
      if (diff > 1) {
        const parsed = stats ? JSON.parse(stats) : { xp: 0 };
        await AsyncStorage.setItem('userStats', JSON.stringify({ streak: 0, xp: parsed.xp }));
        setStreak(0);
        setXp(parsed.xp);
        return;
      }
    }

    // ✅ ✅ FIXED: Load goal from AsyncStorage
    const goal = await AsyncStorage.getItem('jobsPerDay');
    if (goal) setDailyGoal(parseInt(goal, 10));

    // ✅ Set existing stats
    if (stats) {
      const parsed = JSON.parse(stats);
      setStreak(parsed.streak || 0);
      setXp(parsed.xp || 0);
    }
  } catch (e) {
    console.error('Failed to load user stats:', e);
  }
};

  // Update goal and sync with widget
  const updateGoalAndSyncWidget = async (newGoal) => {
    // Update the goal state
    setDailyGoal(newGoal);

    // Update AsyncStorage with the new goal
    await AsyncStorage.setItem('jobsPerDay', newGoal.toString());

    // Sync the widget with the new goal
    if (Platform.OS === 'android') {
      try {
        NativeModules.WidgetUpdateModule.setJobStats(newGoal, 0); // Sync goal with the widget
        console.log(`🟢 Synced updated goal with widget → job_goal: ${newGoal}`);
      } catch (e) {
        console.error('❌ Failed to sync widget with updated goal:', e);
      }
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
        key={calendarKey}
         onDayPress={(day) => {
           
            navigation.navigate('JobDetails', { selectedDate: day.dateString });
         }}

         maxDate={todayString}

  

dayComponent={({ date, state }) => {
  const [dayProgress, setDayProgress] = useState(null);
  //const isFuture = date.dateString > todayString;
  const isFuture = !isTodayOrPast(date.dateString);


  useEffect(() => {
    getDayProgress(date.dateString).then(setDayProgress);
  }, []);

  return (
    <TouchableOpacity
      disabled={isFuture}
      onPress={() => {
        if (!isFuture) {
          navigation.navigate('JobDetails', { selectedDate: date.dateString });
        }
      }}
      style={{ alignItems: 'center', paddingVertical: 4 }}
    >
      <Text
        style={{
          color: isFuture ? '#555' : (state === 'today' ? '#28a745' : '#fff'),
          fontWeight: state === 'today' ? 'bold' : 'normal',
        }}
      >
        {date.day}
      </Text>

      {dayProgress !== null && (
        <Progress.Bar
          progress={dayProgress}
          width={28}
          height={4}
          borderRadius={2}
          //color={dayProgress === 1 ? '#4CAF50' : '#FFD700'}
          color={dayProgress >= 1 ? '#4CAF50' : '#FFD700'}
          unfilledColor="#444"
          borderWidth={0}
        />
      )}
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


       {/* <TouchableOpacity style={styles.goalButton} onPress={() => navigation.navigate('GoalSettings')}>
      <View style={styles.goalButtonContent}>
        <View>
          <Text style={styles.goalTitle}>Goal change</Text>
          <Text style={styles.goalSubtitle}>change your daily goal</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity> */}

    <TouchableOpacity style={styles.goalButton} onPress={() => navigation.navigate('GoalSettings')}>
  <View style={styles.goalButtonContent}>
    <Image
      source={goalIcon}
      style={styles.goalImage}
      resizeMode="contain"
    />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.goalTitle}>Goal change</Text>
      <Text style={styles.goalSubtitle}>change your daily goal</Text>
    </View>
    <Text style={styles.arrow}>→</Text>
  </View>
</TouchableOpacity>





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
goalButton: {
  backgroundColor: '#fff',
  padding: 16,
  borderRadius: 0,
  marginTop: 16,
  position: 'relative',
},

goalButtonContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
// goalImage: {
//   width: 32,
//   height: 32,
// },

goalTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000',
},

goalSubtitle: {
  fontSize: 13,
  color: '#666',
  marginTop: 2,
},

arrow: {
  position: 'absolute',
  top: -30,
  right: 12,
  fontSize: 38,
  color: '#000',
},


});
