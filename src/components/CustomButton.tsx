import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean; // Optional prop, default is false if not provided
  style?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress,style, text, disabled = false }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.buttonDisabled]} 
      onPress={onPress} 
      disabled={disabled}
      style={[styles.button, style, disabled && styles.buttonDisabled]}
       //style={[styles.button, style]}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{text}</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginLeft: 25,
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
    backgroundColor: '#aaa',
  },
});

export default CustomButton;
