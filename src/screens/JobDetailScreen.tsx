
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet,TextInput, TouchableOpacity,ScrollView, ToastAndroid, Platform, Alert, NativeModules } from 'react-native';
import * as Progress from 'react-native-progress';
import StreakAndXp from '../components/StreakAndXp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JobApplicationCard from '../components/JobApplicationCard';
import CustomButton from '../components/CustomButton';
import { useFocusEffect } from '@react-navigation/native';
const { WidgetUpdateModule } = NativeModules;


const isDateInPast = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const selected = new Date(year, month - 1, day); // Local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selected.setHours(0, 0, 0, 0);
  return selected < today;
};

const JobDetailScreen = ({ route }) => {
  const { selectedDate } = route.params;
  
   useEffect(() => {
    // const clearStorageOnce = async () => {
    //   try {
    //     await AsyncStorage.clear();
    //     console.log('✅ AsyncStorage cleared');
    //   } catch (e) {
    //     console.error('❌ Error clearing AsyncStorage:', e);
    //   }
    // };
    
    // clearStorageOnce();

    console.log('WidgetUpdateModule:', WidgetUpdateModule); 
  }, []);


  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  const [progress, setProgress] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(1); 


const [jobs, setJobs] = useState([]);

//here1
const [isButtonEnabled, setIsButtonEnabled] = useState(false);
const [goalMarkedComplete, setGoalMarkedComplete] = useState(false);
const [isPastDate, setIsPastDate] = useState(false);


const [warnedOnce, setWarnedOnce] = useState(false);

const updateStreakAndXp = async (newXp, newStreak) => {
  try {
    await AsyncStorage.setItem('xp', newXp.toString());
    await AsyncStorage.setItem('streak', newStreak.toString());

    console.log('XP and Streak updated in AsyncStorage updateStreakandxp:', newXp, newStreak);

    WidgetUpdateModule.setStatsAndUpdateWidget(newXp, newStreak);

    
   console.log('Widget update triggered');


  } catch (error) {
    console.error('Error updating XP and Streak:', error);
  }
};

const showWarningToast = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        '⚠️ Editing after completion may revoke your streak!',
        ToastAndroid.SHORT
      );
    } else {
      Alert.alert('Warning', 'Editing after completion may revoke your streak!');
    }
  };

  const checkForRevocation = async (updatedJobs) => {
    const doneCount = updatedJobs.filter(job => job.status === 'DONE').length;

    if (goalMarkedComplete && doneCount < dailyGoal) {
      setGoalMarkedComplete(false);
      setIsButtonEnabled(doneCount >= dailyGoal);

      const newStreak = Math.max(streak - 1, 0);
      const newXp = Math.max(xp - 10, 0);

      setStreak(newStreak);
      setXp(newXp);

      updateStreakAndXp(newXp, newStreak);

      await AsyncStorage.setItem('userStats', JSON.stringify({ streak: newStreak, xp: newXp }));
      await updateStreakAndXp(newXp, newStreak);

      await AsyncStorage.setItem(`goalCompleted-${selectedDate}`, 'false');
      await AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(updatedJobs));

      if (!warnedOnce) {
        showWarningToast();
        setWarnedOnce(true);
      }
    }
  };




  useEffect(() => {
    loadUserStats();
  }, []);

useFocusEffect(
  useCallback(() => {
    loadUserStats(); // 👈 reload stats + goal when screen focused
  }, [])
);




const loadUserStats = async () => {
  try {
    const [stats, goal, savedJobs, completed, lastCompletedDate] = await Promise.all([
      AsyncStorage.getItem('userStats'),
      AsyncStorage.getItem('jobsPerDay'),
      AsyncStorage.getItem(`jobs-${selectedDate}`),
      AsyncStorage.getItem(`goalCompleted-${selectedDate}`),
      AsyncStorage.getItem('lastCompletedDate')
    ]);

    setIsPastDate(isDateInPast(selectedDate));
    if (goal) setDailyGoal(parseInt(goal));
    if (completed === 'true') setGoalMarkedComplete(true);

    // Initialize with default values
    let currentStreak = 0;
    let currentXpValue = 0;

    if (stats) {
      const parsed = JSON.parse(stats);
      currentStreak = parsed.streak || 0;
      currentXpValue = parsed.xp || 0;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = today.toISOString().split('T')[0];

    // Check for streak break if this is today's screen
    if (selectedDate === todayString && lastCompletedDate) {
      const lastCompleted = new Date(lastCompletedDate);
      lastCompleted.setHours(0, 0, 0, 0);

      const daysSinceLastCompletion = Math.floor((today - lastCompleted) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastCompletion > 1) {
        console.log('⚠️ Streak broken! Resetting to 0');
        currentStreak = 0;
        
        // Create updated stats object
        const updatedStats = {
          streak: 0,
          xp: currentXpValue
        };

        // Update everything in parallel
        await Promise.all([
          AsyncStorage.setItem('userStats', JSON.stringify(updatedStats)),
          AsyncStorage.setItem('lastCompletedDate', todayString),
          Platform.OS === 'android' ? 
            WidgetUpdateModule.setStatsAndUpdateWidget(currentXpValue, 0) : 
            Promise.resolve()
        ]);
      }
    }

    // Update state with the potentially corrected values
    setStreak(currentStreak);
    setXp(currentXpValue);

    // Load and process jobs
    let parsedJobs = [];
    // if (savedJobs) {
    //   parsedJobs = JSON.parse(savedJobs);
      
    // } else {
    //   const jobCount = parseInt(goal) || 1;
    //   parsedJobs = Array.from({ length: jobCount }, () => ({
    //     title: '',
    //     company: '',
    //     link: '',
    //     status: 'PENDING',
    //   }));
    //   await AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(parsedJobs));
    // }

    if (savedJobs) {
  parsedJobs = JSON.parse(savedJobs);
  const oldLength = parsedJobs.length;
  const newGoal = parseInt(goal) || 1;

  if (newGoal > oldLength) {
    // Goal increased → Add empty jobs
    const jobsToAdd = newGoal - oldLength;
    const emptyJobs = Array.from({ length: jobsToAdd }, () => ({
      title: '',
      company: '',
      link: '',
      status: 'PENDING',
    }));
    parsedJobs = [...parsedJobs, ...emptyJobs];
  } else if (newGoal < oldLength) {
    // Goal decreased → Remove only empty jobs
    let updated = [...parsedJobs];
    let toRemove = oldLength - newGoal;
    for (let i = updated.length - 1; i >= 0 && toRemove > 0; i--) {
      const { title, company, link, status } = updated[i];
      const isEmpty = !title && !company && !link && status === 'PENDING';
      if (isEmpty) {
        updated.splice(i, 1);
        toRemove--;
      }
    }
    parsedJobs = updated;
  }

  await AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(parsedJobs));
} else {
  const jobCount = parseInt(goal) || 1;
  parsedJobs = Array.from({ length: jobCount }, () => ({
    title: '',
    company: '',
    link: '',
    status: 'PENDING',
  }));
  await AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(parsedJobs));
}


    setJobs(parsedJobs);

    // Update progress
    const goalCount = parseInt(goal) || 1;
    const doneCount = parsedJobs.filter(job => job.status === 'DONE').length;
    const progressValue = Math.min(doneCount / goalCount, 1);
    setProgress(progressValue);

    // Sync with widget
    if (Platform.OS === 'android') {
      try {
        await WidgetUpdateModule.setStatsAndUpdateWidget(currentXpValue, currentStreak);
        await NativeModules.WidgetUpdateModule.setJobStats(goalCount, doneCount);
      } catch (e) {
        console.error('Failed to sync widget stats:', e);
      }
    }

    setIsButtonEnabled(doneCount >= parseInt(goal) && completed !== 'true');

  } catch (e) {
    console.error('Failed to load user stats:', e);
    setStreak(0);
    setXp(0);
  }
};


const addNewJob = () => {
    const newJob = {
      title: '',
      company: '',
      link: '',
      status: 'pending',
    };
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(updatedJobs));
  };

// const markComplete = async () => {
//   const todayStr = new Date().toISOString().split('T')[0];
//   if (selectedDate !== todayStr) {
//     console.log('❌ Can only mark today as complete.');
//     return;
//   }

//   const doneCount = jobs.filter(job => job.status === 'DONE').length;
//   if (doneCount < dailyGoal || goalMarkedComplete) return;

//   // ✅ Read userStats fresh
//   const statsString = await AsyncStorage.getItem('userStats');
//   let savedStreak = 0;
//   let savedXp = 0;

//   if (statsString) {
//     const parsed = JSON.parse(statsString);
//     savedStreak = parsed.streak || 0;
//     savedXp = parsed.xp || 0;
//   }

//   // ✅ Check if yesterday was completed
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);
//   yesterday.setHours(0, 0, 0, 0);
//   const yesterdayStr = yesterday.toISOString().split('T')[0];

//   const yesterdayCompleted = await AsyncStorage.getItem(`goalCompleted-${yesterdayStr}`);
//   const newStreak = yesterdayCompleted === 'true' ? savedStreak + 1 : 1;
//   const newXp = savedXp + 10;

//   // Update UI state
//   setStreak(newStreak);
//   setXp(newXp);
//   setGoalMarkedComplete(true);
//   setIsButtonEnabled(false);

//   // Save new values
//   await AsyncStorage.setItem('userStats', JSON.stringify({ streak: newStreak, xp: newXp }));
//   await AsyncStorage.setItem('lastCompletedDate', todayStr);
//   await AsyncStorage.setItem(`goalCompleted-${selectedDate}`, 'true');

//   if (Platform.OS === 'android') {
//     try {
//       WidgetUpdateModule.setStatsAndUpdateWidget(newXp, newStreak);
//     } catch (e) {
//       console.error('❌ Failed to update widget:', e);
//     }
//   }

//     await AsyncStorage.setItem('lastCompletedDate', todayStr);

//   console.log(`✅ Goal marked complete. Streak: ${newStreak}, XP: ${newXp}`);
// };



// const markComplete = async () => {
//   const todayStr = new Date().toISOString().split('T')[0];
//   if (selectedDate !== todayStr) {
//     console.log('❌ Can only mark today as complete.');
//     return;
//   }

//   const doneCount = jobs.filter(job => job.status === 'DONE').length;
//   if (doneCount < dailyGoal || goalMarkedComplete) return;

//   // Get current stats
//   const statsString = await AsyncStorage.getItem('userStats');
//   let savedStreak = 0;
//   let savedXp = 0;

//   if (statsString) {
//     const parsed = JSON.parse(statsString);
//     savedStreak = parsed.streak || 0;
//     savedXp = parsed.xp || 0;
//   }

//   // Check if yesterday was completed
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);
//   const yesterdayStr = yesterday.toISOString().split('T')[0];
//   const yesterdayCompleted = await AsyncStorage.getItem(`goalCompleted-${yesterdayStr}`);

//   // Calculate new streak
//   let newStreak = savedStreak;
//   let xpToAdd = 10; // Base XP
  
//   if (yesterdayCompleted === 'true') {
//     // Consecutive day - increment streak
//     newStreak += 1;
//     // Bonus XP based on streak (e.g., 10 XP per day of streak)
//     xpToAdd += newStreak * 10; 
//   } else {
//     // Not consecutive - reset streak to 1
//     newStreak = 1;
//   }

//   const newXp = savedXp + xpToAdd;

//   // Update UI state
//   setStreak(newStreak);
//   setXp(newXp);
//   setGoalMarkedComplete(true);
//   setIsButtonEnabled(false);

//   // Save new values
//   await AsyncStorage.setItem('userStats', JSON.stringify({ streak: newStreak, xp: newXp }));
//   await AsyncStorage.setItem('lastCompletedDate', todayStr);
//   await AsyncStorage.setItem(`goalCompleted-${selectedDate}`, 'true');

//   if (Platform.OS === 'android') {
//     try {
//       WidgetUpdateModule.setStatsAndUpdateWidget(newXp, newStreak);
//     } catch (e) {
//       console.error('❌ Failed to update widget:', e);
//     }
//   }

//   console.log(`✅ Goal marked complete. Streak: ${newStreak}, XP: ${newXp}`);
// };


const markComplete = async () => {
  const todayStr = new Date().toISOString().split('T')[0];
  if (selectedDate !== todayStr) {
    console.log('❌ Can only mark today as complete.');
    return;
  }

  const doneCount = jobs.filter(job => job.status === 'DONE').length;
  if (doneCount < dailyGoal || goalMarkedComplete) return;

  // Get current stats
  const statsString = await AsyncStorage.getItem('userStats');
  let savedStreak = 0;
  let savedXp = 0;

  if (statsString) {
    const parsed = JSON.parse(statsString);
    savedStreak = parsed.streak || 0;
    savedXp = parsed.xp || 0;
  }

  // Check if yesterday was completed
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  const yesterdayCompleted = await AsyncStorage.getItem(`goalCompleted-${yesterdayStr}`);

  // Calculate new streak
  // let newStreak = 1; // Default to 1 if yesterday wasn't completed
  // if (yesterdayCompleted === 'true') {
  //   newStreak = savedStreak + 1; // Increment streak if yesterday was completed
  // }
  

  let newStreak = 0;

if (!savedStreak || savedStreak === 0) {
  // First day, no streak yet
  newStreak = 1;
} else if (yesterdayCompleted === 'true') {
  // Continuing streak
  newStreak = savedStreak + 1;
} else {
  // Streak broken
  newStreak = 0;
}


  // Always add exactly 10 XP (regardless of streak)
  const newXp = savedXp + 10;

  // Update UI state
  setStreak(newStreak);
  setXp(newXp);
  setGoalMarkedComplete(true);
  setIsButtonEnabled(false);

  // Save new values
  await AsyncStorage.setItem('userStats', JSON.stringify({ streak: newStreak, xp: newXp }));
  await AsyncStorage.setItem('lastCompletedDate', todayStr);
  await AsyncStorage.setItem(`goalCompleted-${selectedDate}`, 'true');

  if (Platform.OS === 'android') {
    try {
      WidgetUpdateModule.setStatsAndUpdateWidget(newXp, newStreak);
    } catch (e) {
      console.error('❌ Failed to update widget:', e);
    }
  }

  console.log(`✅ Goal marked complete. Streak: ${newStreak}, XP: ${newXp}`);
};

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { flexGrow: 1 }]}>
    <View style={styles.container}>
      {/* Header */}
      <StreakAndXp streak={streak} xp={xp} />

       <View style={styles.progressContainer}>
  {/* <Progress.Circle
    size={40}
    progress={progress}
    color="#4CAF50"
    unfilledColor="#333"
    borderWidth={0}
    showsText={false}
    style={{ marginLeft: 20 }}
    
  /> */}


  <Progress.Circle
  size={40}
  progress={progress}
  color="#4CAF50"
  unfilledColor="#333"
  borderWidth={0}
  showsText={false}
  style={{ marginLeft: 20, opacity: isPastDate ? 0.1 : 1 }}
/>





  {/* <Text style={styles.progressText}>
    {Math.round(progress * 100)}%{'\n'}
    <Text style={styles.progressTextTwo}>of daily goal</Text>
  </Text> */}
  <View>
  <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
  <Text style={styles.progressTextTwo}>of daily goal</Text>
</View>
</View>
        

    



{jobs.map((job, index) => (
  <JobApplicationCard
    key={index}
    job={job}
    disabled={isPastDate}
   

    onRemove={() => {
  if (isPastDate) return;
  const updatedJobs = jobs.filter((_, i) => i !== index);
  setJobs(updatedJobs);
  AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(updatedJobs));
  
  const doneCount = updatedJobs.filter(job => job.status === 'DONE').length;
  const progressValue = Math.min(doneCount / dailyGoal, 1);
  setProgress(progressValue);
  setIsButtonEnabled(doneCount >= dailyGoal);

  checkForRevocation(updatedJobs); // 👈 Added
}}




//     setJob={(updatedJob) => {
//   if (isPastDate) return;
//   const updatedJobs = [...jobs];
//   updatedJobs[index] = updatedJob;
//   setJobs(updatedJobs);
//   AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(updatedJobs));
  
//   const doneCount = updatedJobs.filter(job => job.status === 'DONE').length;
//   const progressValue = Math.min(doneCount / dailyGoal, 1);
//   setProgress(progressValue);
//   setIsButtonEnabled(doneCount >= dailyGoal);

//   checkForRevocation(updatedJobs); // 👈 Added
// }}


// setJob={(updatedJob) => {
//   if (isPastDate) return;

//   // Update the job status in the jobs array
//   const updatedJobs = [...jobs];
//   updatedJobs[index] = updatedJob;
  
//   // Save updated jobs to AsyncStorage
//   AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(updatedJobs));

//   // Count how many jobs are marked as "DONE"
//   const doneCount = updatedJobs.filter(job => job.status === 'DONE').length;

//   // Calculate progress based on doneCount and goal
//   const progressValue = Math.min(doneCount / dailyGoal, 1);
//   setProgress(progressValue);

//   // Enable or disable the button based on progress
//   setIsButtonEnabled(doneCount >= dailyGoal);

//   // Sync data to the widget
//   if (Platform.OS === 'android') {
//     try {
//       NativeModules.WidgetUpdateModule.setJobStats(dailyGoal, doneCount);  // Sync goal and completed jobs count
//       console.log(`🟢 Synced widget stats → job_goal: ${dailyGoal}, jobs_completed: ${doneCount}`);
//     } catch (e) {
//       console.error('❌ Failed to sync widget stats:', e);
//     }
//   }

//   // Check if the goal was changed after job status update
//   checkForRevocation(updatedJobs); // 👈 Added
// }}

setJob={(updatedJob) => {
  if (isPastDate) return;

  const updatedJobs = [...jobs];
  updatedJobs[index] = { ...updatedJobs[index], ...updatedJob };  // Update only the changed fields

  // Save updated jobs to AsyncStorage
  AsyncStorage.setItem(`jobs-${selectedDate}`, JSON.stringify(updatedJobs));

  // Update state with the new jobs array
  setJobs(updatedJobs);

  // Count how many jobs are marked as "DONE"
  const doneCount = updatedJobs.filter(job => job.status === 'DONE').length;

  // Calculate progress based on doneCount and goal
  const progressValue = Math.min(doneCount / dailyGoal, 1);
  setProgress(progressValue);

  // Enable or disable the button based on progress
  setIsButtonEnabled(doneCount >= dailyGoal);

  // Sync data to the widget
  if (Platform.OS === 'android') {
    try {
      NativeModules.WidgetUpdateModule.setJobStats(dailyGoal, doneCount);  // Sync goal and completed jobs count
      console.log(`🟢 Synced widget stats → job_goal: ${dailyGoal}, jobs_completed: ${doneCount}`);
    } catch (e) {
      console.error('❌ Failed to sync widget stats:', e);
    }
  }

  // Check if the goal was changed after job status update
  checkForRevocation(updatedJobs);
}}







  />
))}




<TouchableOpacity
  style={styles.addButton}
  onPress={addNewJob}
  disabled={isPastDate}
>
  <Text style={[styles.addButtonText, isPastDate && { opacity: 0.4 }]}>
    add more +
  </Text>
</TouchableOpacity>


 <CustomButton
          text="Mark Complete"
          onPress={markComplete}
          //disabled={!isButtonEnabled} // Button disabled until goal is met
          disabled={!isButtonEnabled || goalMarkedComplete|| isPastDate} 
          style={styles.customButton}
        />

        {isPastDate && (
  <Text style={{ color: '#aaa', marginLeft: 25, marginTop: 6 }}>
    You can't mark past dates as complete.
  </Text>
)}

       
  
  
    </View>
    </ScrollView>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
    flexDirection:'column',
  },
  
  dateText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  progressContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 20,
  gap: 12,
},
progressText: {
  color: '#D3D3D3',
  fontSize: 14,
  lineHeight: 20,
  fontWeight: 'bold',
},
progressTextTwo:  {
  color: '#D3D3D3',
  fontSize: 14,
  lineHeight: 20,
  
},
card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#2a2a2c',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },

  addButton: {
  //backgroundColor: '#4CAF50',
  paddingVertical: 12,
  //borderRadius: 8,
  alignItems: 'center',
  //marginTop: 10,
  marginBottom:0,
  
},
addButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  fontStyle: 'italic',
},

 customButton: {
    marginTop: 8,
    
   
  },


});



