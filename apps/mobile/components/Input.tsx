import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type InputProps = {
  name: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

export default function Input({ name, label, value, onChange }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={name}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginLeft: 6,
    marginBottom: 4,
    color: '#374151', // Tailwind gray-700
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB', // Tailwind gray-300
    borderRadius: 8,
    fontSize: 16,
    color: '#111827', // Tailwind gray-900
  },
});
