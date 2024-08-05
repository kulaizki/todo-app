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

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  toggleCompleted,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const inputRef = useRef<TextInput>(null);

  // Get the color scheme
  const colorScheme = useColorScheme();

  // Define colors for light and dark modes
  const borderBottomColor = colorScheme === 'dark' ? '#505050' : '#d6d6d6';
  const inputColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;

  const handleSave = () => {
    if (newText.trim()) {
      editTodo(item.id, newText); // Call editTodo with the new text
      setIsEditing(false);
      Keyboard.dismiss(); // Dismiss keyboard after saving
    }
  };

  const handleKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === 'Enter') {
      handleSave();
    }
  };

  useEffect(() => {
    const handleTouchOutside = () => {
      if (inputRef.current && !inputRef.current.isFocused()) {
        handleSave();
      }
    };

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", handleTouchOutside);

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [isEditing]);

  return (
    <TouchableWithoutFeedback onPress={() => { if (isEditing && inputRef.current && !inputRef.current.isFocused()) handleSave(); }}>
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
              onSubmitEditing={handleSave} // Save when pressing "Enter"
              onKeyPress={handleKeyPress} // Handle key presses
              autoFocus
              style={[styles.input, { color: inputColor }]}
              multiline // Allow multiline input
              onBlur={() => { // Save when input loses focus
                if (inputRef.current && !inputRef.current.isFocused()) {
                  handleSave();
                }
              }}
              blurOnSubmit={false} // Disable auto-blur on submit
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start", // Ensure vertical alignment is consistent
    padding: 12,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24, // Ensure line height matches your text spacing
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
    textAlignVertical: 'top', // Align text to the top
    borderColor: Colors.light.primary,
    borderWidth: 1, // Add a border to make it look consistent
    borderRadius: 4, // Rounded corners
    paddingHorizontal: 8, // Consistent horizontal padding
    paddingVertical: 4, // Add some vertical padding
    minHeight: 40, // Minimum height to prevent squishing
  },
});

export default TodoItem;
