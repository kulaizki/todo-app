// TodoItem.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { TodoItemProps } from "@/types";
import { Colors } from "@/constants/Colors";

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  toggleCompleted,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const handleSave = () => {
    if (newText.trim()) {
      editTodo(item.id, newText); // Call editTodo with the new text
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => toggleCompleted(item.id)}
      >
        {item.completed && <View style={styles.innerCircle} />}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {isEditing ? (
          <TextInput
            value={newText}
            onChangeText={setNewText}
            onSubmitEditing={handleSave}
            autoFocus
            style={styles.input}
          />
        ) : (
          <Text
            style={[styles.text, item.completed ? styles.completed : null]}
            onPress={() => setIsEditing(true)}
          >
            {item.text}
          </Text>
        )}
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
  input: {
    fontSize: 18,
  },
});

export default TodoItem;
