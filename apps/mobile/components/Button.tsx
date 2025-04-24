import React from 'react';
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function Button({ label, onPress }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonWrapper} activeOpacity={0.9}>
      <LinearGradient
        colors={['#0A8270', '#7CFF6B']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
