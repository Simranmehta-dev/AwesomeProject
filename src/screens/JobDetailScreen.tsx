
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,TextInput } from 'react-native';
import * as Progress from 'react-native-progress';
import StreakAndXp from '../components/StreakAndXp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JobApplicationCard from '../components/JobApplicationCard';



const JobDetailScreen = ({ route }) => {
  const { selectedDate } = route.params;
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  const [progress, setProgress] = useState(0);
const [dailyGoal, setDailyGoal] = useState(1); 

const [job, setJob] = useState({
    title: '',
    company: '',
    link: '',
    status: 'pending',
  });

  useEffect(() => {
    loadUserStats();
  }, []);

//   const loadUserStats = async () => {
//     try {
//       const stats = await AsyncStorage.getItem('userStats');
//       if (stats) {
//         const parsed = JSON.parse(stats);
//         setStreak(parsed.streak || 0);
//         setXp(parsed.xp || 0);
//       }
//     } catch (e) {
//       console.error('Failed to load user stats:', e);
//     }
//   };

const loadUserStats = async () => {
  try {
    const stats = await AsyncStorage.getItem('userStats');
    const goal = await AsyncStorage.getItem('jobsPerDay');
    const jobs = await AsyncStorage.getItem(`jobs-${selectedDate}`);

    if (goal) setDailyGoal(parseInt(goal));

    if (stats) {
      const parsed = JSON.parse(stats);
      setStreak(parsed.streak || 0);
      setXp(parsed.xp || 0);
    }

    const parsedJobs = jobs ? JSON.parse(jobs) : [];

    if (parsedJobs.length > 0) {
        setJob(parsedJobs[0]); // Load first job
      }

    const value = Math.min(parsedJobs.length / (parseInt(goal) || 1), 1);
    setProgress(value);

  } catch (e) {
    console.error('Failed to load user stats:', e);
  }
};



  return (
    <View style={styles.container}>
      {/* Header */}
      <StreakAndXp streak={streak} xp={xp} />

       <View style={styles.progressContainer}>
  <Progress.Circle
    size={40}
    progress={progress}
    color="#4CAF50"
    unfilledColor="#333"
    borderWidth={0}
    showsText={false}
    style={{ marginLeft: 20 }}
    
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

      {/* Selected Date */}
      <Text style={styles.dateText}>Selected Date: {selectedDate}</Text>


        {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>Job Application</Text>

        <TextInput
          placeholder="Job Title"
          placeholderTextColor="#aaa"
          value={job.title}
          onChangeText={(text) => setJob({ ...job, title: text })}
          style={styles.input}
        />

        <TextInput
          placeholder="Company Name"
          placeholderTextColor="#aaa"
          value={job.company}
          onChangeText={(text) => setJob({ ...job, company: text })}
          style={styles.input}
        />

        <TextInput
          placeholder="Job Link"
          placeholderTextColor="#aaa"
          value={job.link}
          onChangeText={(text) => setJob({ ...job, link: text })}
          style={styles.input}
        />
      </View> */}

      <JobApplicationCard job={job} setJob={setJob} />
  
  
    </View>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
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

});

