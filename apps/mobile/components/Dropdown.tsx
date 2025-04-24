import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
};

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  placeholder = 'Seçiniz',
}: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const selected = options.find(opt => opt.value === value);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)}>
        <Text style={[styles.selectorText, !selected && styles.placeholder]}>
          {selected ? selected.label : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === value && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
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
    color: '#374151', // gray-700
  },
  selector: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray-300
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectorText: {
    fontSize: 16,
    color: '#111827', // gray-900
  },
  placeholder: {
    color: '#9CA3AF', // gray-400
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: '50%',
    paddingVertical: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: '#EFF6FF', // Tailwind blue-50
  },
  optionText: {
    fontSize: 16,
  },
});
