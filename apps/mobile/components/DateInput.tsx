import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import dayjs, { Dayjs } from "dayjs";

type DateInputProps = {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
  label: string;
  format?: string;
};

export default function DateInput({
  value,
  onChange,
  label,
  format = "DD.MM.YYYY",
}: DateInputProps) {
  const [inputValue, setInputValue] = useState(dayjs(value).format(format));
  const [error, setError] = useState(false);

  const handleChange = (text: string) => {
    setInputValue(text);

    const parsed = dayjs(text, format, true);
    if (parsed.isValid()) {
      setError(false);
      onChange(parsed);
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={inputValue}
        onChangeText={handleChange}
        placeholder={format.toLowerCase()}
        style={[
          styles.input,
          error && { borderColor: "red" },
        ]}
      />
      {error && (
        <Text style={styles.errorText}>
          Geçerli bir tarih girin ({format})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginLeft: 6,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 6,
    marginTop: 4,
  },
});
