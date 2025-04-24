import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange(!checked)}
      style={styles.container}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.label, disabled && styles.disabledLabel]}>
        {label}
      </Text>
      <View
        style={[
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabledCheckbox,
        ]}
      >
        {checked && <View style={styles.innerDot} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#1F2937', // gray-800
  },
  disabledLabel: {
    color: '#9CA3AF', // gray-400
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E0', // gray-300
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    borderColor: '#2563EB', // blue-600
    backgroundColor: '#2563EB',
  },
  innerDot: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  disabledCheckbox: {
    opacity: 0.5,
  },
});
