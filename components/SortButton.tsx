import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

interface SortButtonProps {
  title: string;
  onPress: () => void;
  isActive: boolean;
}

const SortButton: React.FC<SortButtonProps> = ({ title, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: Colors.light.primary,
  },
  text: {
    fontSize: 16,
    color: Colors.light.primary,
  },
  activeText: {
    color: '#fff',
  },
});

export default SortButton;
