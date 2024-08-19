import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme
} from "react-native";
import { TodoItemProps } from "@/types";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { handleSave, handleKeyPress } from "@/utils/todo";
import DeleteButton from "@/components/DeleteButton";

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  toggleCompleted,
  editTodo,
  todos,
  setTodos
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const inputRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme();
  const borderBottomColor = colorScheme === 'dark' ? '#505050' : '#d6d6d6';
  const inputColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;

  useEffect(() => {
    const handleTouchOutside = () => {
      if (inputRef.current && !inputRef.current.isFocused()) {
        handleSave(newText, item.id, editTodo, setIsEditing, setNewText, inputRef);
      }
    };

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", handleTouchOutside);

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [isEditing, newText, editTodo]);

  return (
    <TouchableWithoutFeedback onPress={() => { 
      if (isEditing && inputRef.current && !inputRef.current.isFocused()) {
        handleSave(newText, item.id, editTodo, setIsEditing, setNewText, inputRef);
      }
    }}>
      <View style={[styles.item, { borderBottomColor }]}>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => toggleCompleted(item.id)}
        >
          {item.completed && <View style={styles.innerCircle} />}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          {isEditing ? (
            <TextInput
              ref={inputRef}
              value={newText}
              onChangeText={setNewText}
              onSubmitEditing={() => handleSave(newText, item.id, editTodo, setIsEditing, setNewText, inputRef)}
              onKeyPress={(event) => handleKeyPress(event, () => handleSave(newText, item.id, editTodo, setIsEditing, setNewText, inputRef))}
              autoFocus
              style={[styles.input, { color: inputColor }]}
              multiline
              onBlur={() => handleSave(newText, item.id, editTodo, setIsEditing, setNewText, inputRef)}
              autoCapitalize="none"
              blurOnSubmit={true}
            />
          ) : (
            <ThemedText
              style={[styles.text, item.completed ? styles.completed : null]}
              onPress={() => setIsEditing(true)}
            >
              {item.text}
            </ThemedText>
          )}
        </View>
        <DeleteButton id={item.id} todos={todos} setTodos={setTodos} /> 
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
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
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minHeight: 40,
  },
});

export default TodoItem;
