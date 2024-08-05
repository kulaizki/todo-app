import React from "react";
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { SortDropdownProps } from "@/types";

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, setSortOption }) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSortOption(value)}
        items={[
          { label: 'Sort by Time', value: 'time' },
          { label: 'Sort by Completion', value: 'completion' },
        ]}
        value={sortOption}
        style={{
          ...pickerSelectStyles,
          viewContainer: {
            ...pickerSelectStyles.inputIOS,
            ...pickerSelectStyles.inputAndroid,
          },
        }}
        placeholder={{ label: 'Select sort option...', value: null }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderColor: Colors.light.primary,
    borderRadius: 4,
    color: 'white',
    backgroundColor: Colors.light.primary,
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 1,
    paddingVertical: 4,
    borderColor: Colors.light.primary,
    borderRadius: 4,
    color: 'white',
    backgroundColor: Colors.light.primary,
  },
});

export default SortDropdown;
