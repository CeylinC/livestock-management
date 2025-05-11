import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

type InputProps = {
  name: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
};

export default function Input({ label, value, onChange, secureTextEntry = false }: InputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureTextEntry = () => {
    setIsSecure(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.input}
          secureTextEntry={isSecure}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.eyeIcon}>
            <Text style={styles.eyeText}>{isSecure ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        )}
      </View>
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
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    fontSize: 16,
    color: '#111827',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  eyeText: {
    color: '#1D4ED8',
    fontSize: 14,
    fontWeight: '500',
  },
});
