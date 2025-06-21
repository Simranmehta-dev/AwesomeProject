// import React from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';

// const JobApplicationCard = ({ job, setJob }) => {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>Job Application</Text>

//       <TextInput
//         placeholder="Job Title"
//         placeholderTextColor="#aaa"
//         value={job.title}
//         onChangeText={(text) => setJob({ ...job, title: text })}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Company Name"
//         placeholderTextColor="#aaa"
//         value={job.company}
//         onChangeText={(text) => setJob({ ...job, company: text })}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Job Link"
//         placeholderTextColor="#aaa"
//         value={job.link}
//         onChangeText={(text) => setJob({ ...job, link: text })}
//         style={styles.input}
//       />
//     </View>
//   );
// };

// export default JobApplicationCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#1c1c1e',
//     borderRadius: 12,
//     padding: 16,
//     marginTop: 20,
//   },
//   cardTitle: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: '#2a2a2c',
//     color: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginBottom: 12,
//   },
// });



// import React, { useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';

// const JobApplicationCard = ({ job, setJob }) => {
//   // Automatically update status based on fields
//   useEffect(() => {
//     const isComplete = job.title && job.company && job.link;
//     setJob(prev => ({
//       ...prev,
//       status: isComplete ? 'done' : 'pending',
//     }));
//   }, [job.title, job.company, job.link]);

//   return (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>Job Application</Text>

//       <TextInput
//         placeholder="Job Title"
//         placeholderTextColor="#aaa"
//         value={job.title}
//         onChangeText={(text) => setJob({ ...job, title: text })}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Company Name"
//         placeholderTextColor="#aaa"
//         value={job.company}
//         onChangeText={(text) => setJob({ ...job, company: text })}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Job Link"
//         placeholderTextColor="#aaa"
//         value={job.link}
//         onChangeText={(text) => setJob({ ...job, link: text })}
//         style={styles.input}
//       />

//       <Text style={styles.status}>
//         Status: <Text style={{ color: job.status === 'done' ? '#4CAF50' : '#F44336' }}>{job.status}</Text>
//       </Text>
//     </View>
//   );
// };

// export default JobApplicationCard;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#1c1c1e',
//     borderRadius: 12,
//     padding: 16,
//     marginTop: 20,
//   },
//   cardTitle: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   input: {
//     backgroundColor: '#2a2a2c',
//     color: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginBottom: 12,
//   },
//   status: {
//     color: '#D3D3D3',
//     marginTop: 8,
//     fontSize: 14,
//   },
// });


import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const JobApplicationCard = ({ job, setJob }) => {
  useEffect(() => {
    const isComplete = job.title && job.company && job.link;
    setJob(prev => ({
      ...prev,
      status: isComplete ? 'DONE' : 'PENDING',
    }));
  }, [job.title, job.company, job.link]);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Job Application</Text>
        <Text
          style={[
            styles.status,
            { color: job.status === 'done' ? '#4CAF50' : '#F44336' },
          ]}>
          {job.status}
        </Text>
      </View>

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
    </View>
  );
};

export default JobApplicationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
