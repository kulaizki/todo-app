import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AddTodoButtonProps } from "@/types";

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 24,
    bottom: 16,
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    color: "#fff",
  },
});

export default AddTodoButton;
