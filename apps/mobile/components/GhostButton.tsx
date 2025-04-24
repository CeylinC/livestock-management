import React from 'react';
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function GhostButton({ label, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#9CA3AF',
    fontSize: 16,
  },
});
