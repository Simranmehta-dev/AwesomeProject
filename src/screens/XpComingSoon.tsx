import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const XpComingSoon: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚧 XP Feature Coming Soon! 🚀</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Gilroy-Bold',
  },
});

export default XpComingSoon;
