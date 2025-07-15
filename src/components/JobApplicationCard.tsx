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


import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet , TouchableOpacity} from 'react-native';


const JobApplicationCard = ({ job, setJob, disabled, onRemove }) => {
  // useEffect(() => {
  //   const isComplete = job.title && job.company && job.link;
  //   setJob(prev => ({
  //     ...prev,
  //     status: isComplete ? 'DONE' : 'PENDING',
  //   }));
  // }, [job.title, job.company, job.link]);

  const [linkError, setLinkError] = useState('');

  useEffect(() => {
  const isComplete = job.title && job.company && job.link;
  setJob({
    ...job,
    status: isComplete ? 'DONE' : 'PENDING',
  });
}, [job.title, job.company, job.link]);




  return (
    <View style={styles.card}>
      {/* <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Job Application</Text>
        <Text
          style={[
            styles.status,
            { color: job.status === 'DONE' ? '#4CAF50' : '#FFD700' },
          ]}>
          {job.status}
        </Text>
      </View> */}

      <View style={styles.cardHeader}>
  <View style={styles.titleWithStatus}>
    <Text style={styles.cardTitle}>Job Application</Text>
    
    <View
      style={[
        styles.statusBox,
        {
          backgroundColor: job.status === 'DONE' ? '#454C13' : '#4D3D15',
        },
      ]}
    >
    
    <Text
      style={[
        styles.status,
        { color: job.status === 'DONE' ? '#E5FE40' : '#FFCB45' },
      ]}>
      {job.status}
    </Text>
    </View>

  </View>

  {!disabled && (
    <TouchableOpacity onPress={onRemove}>
      {/* <Text style={styles.removeButtonTop}>REMOVE</Text> */}
      <Image
      source={require('../assets/images/delete.png')} // 👈 Replace path with your actual image
      style={styles.removeIcon}
    />
    </TouchableOpacity>
  )}
</View>


      

      <TextInput
        placeholder="job title"
        placeholderTextColor="#aaa"
        value={job.title}
        onChangeText={(text) => !disabled && setJob({ ...job, title: text })}
        style={[styles.input, disabled && styles.inputDisabled]}
        editable={!disabled}  // Disable editing if the date is in the past
      />

      <TextInput
        placeholder="Company Name"
        placeholderTextColor="#aaa"
        value={job.company}
        onChangeText={(text) => !disabled && setJob({ ...job, company: text })}
        style={[styles.input, disabled && styles.inputDisabled]}
        editable={!disabled}
      />

   


<TextInput
  placeholder="Job Link"
  placeholderTextColor="#aaa"
  value={job.link}
  onChangeText={(text) => {
    if (!disabled) {
      setJob({ ...job, link: text }); // Always update input
      const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
      if (text === '' || urlPattern.test(text)) {
        setLinkError('');
      } else {
        setLinkError('Please enter a valid link');
      }
    }
  }}
  style={[
    styles.input,
    disabled && styles.inputDisabled,
    linkError && { borderColor: '#F44336', borderWidth: 1 },
  ]}
  editable={!disabled}
/>


{linkError !== '' && (
  <Text style={styles.errorText}>{linkError}</Text>
)}

    
    {/* {!disabled && (
  <TouchableOpacity onPress={onRemove} style={styles.removeButtonContainer}>
    <Text style={styles.removeButton}>REMOVE</Text>
  </TouchableOpacity>
)} */}





    </View>
  );
};

export default JobApplicationCard;

const styles = StyleSheet.create({
  card: {
    
    borderRadius: 0,
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
    fontFamily: 'PlayfairDisplay-Regular',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontFamily: 'Gilroy-Medium',
    
  },
  inputDisabled: {
    backgroundColor: '#333', // Disabled input fields have a different background
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
  color: '#F44336',
  fontSize: 12,
  marginBottom: 8,
  marginLeft: 4,
},
removeButtonContainer: {
  alignItems: 'flex-end',
  marginBottom: 4,
},
removeButton: {
  color: '#F44336',
  fontSize: 12,
  fontWeight: 'bold',
},
titleWithStatus: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8, // use spacing if supported by your React Native version
},

removeButtonTop: {
  color: '#F44336',
  fontSize: 12,
  fontWeight: 'bold',
},
statusBox: {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 0,
  alignItems: 'center',
  justifyContent: 'center',
},

statusText: {
  fontSize: 12,
  fontWeight: 'bold',
  textTransform: 'uppercase',
},

removeIcon: {
  width: 20,
  height: 20,
  tintColor: '#F44336', // optional — applies color tint
  resizeMode: 'contain',
},


});
