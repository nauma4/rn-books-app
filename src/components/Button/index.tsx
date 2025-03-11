import COLORS from '@helpers/colors';
import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';

export interface ButtonPropTypes {
  style?: TextStyle;
  text: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonPropTypes> = ({ style, text, onPress }) => {
  return <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.pink,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 800
  }
});
