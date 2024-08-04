import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TodoItemProps } from "@/types";
import { Colors } from "@/constants/Colors";

const TodoItem: React.FC<TodoItemProps> = ({ item, toggleCompleted }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => toggleCompleted(item.id)}
      >
        {/* Fills the toggle with a circle when task is completed */}
        {item.completed && <View style={styles.innerCircle} />}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.text, item.completed ? styles.completed : null]}>
          {item.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  text: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  toggle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  innerCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.light.primary,
  },
});

export default TodoItem;
