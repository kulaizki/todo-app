import React from "react";
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { SortDropdownProps } from "@/types";

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, setSortOption }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => setSortOption(value)}
      items={[
        { label: 'Sort by Time', value: 'time' },
        { label: 'Sort by Completion', value: 'completion' },
      ]}
      value={sortOption}
      style={pickerSelectStyles}
      placeholder={{ label: 'Select sort option...', value: null }}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 4,
    color: Colors.light.primary,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 4,
    color: Colors.light.primary,
    backgroundColor: 'white',
    marginVertical: 10,
  },
});

export default SortDropdown;
