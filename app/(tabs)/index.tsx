import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import TodoList from "@/components/TodoList";
import AddTodoButton from "@/components/AddTodoButton";
import ClearCompletedButton from "@/components/ClearCompletedButton";
import {
  toggleCompleted,
  handleAddButtonPress,
  handleSaveTask,
  editTodo,
  sortTodos,
  clearCompletedTasks,
  getTodosFromStorage,
} from "@/utils/todo";
import { Todo } from "@/types/index";
import SortDropdown from "@/components/SortDropdown";

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<"time" | "completion">("time");
  const inputRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme() ?? 'light';

  useEffect(() => {
    const fetchTodos = async () => {
      const storedTodos = await getTodosFromStorage();
      setTodos(storedTodos);
    };
    fetchTodos();
  }, []);

  const sortedTodos = sortTodos(todos, sortOption);

  const handlePressOutside = () => {
    Keyboard.dismiss(); // Hide the keyboard
    setIsAdding(false); // Hide the input view
  };

  const handleInputBlur = () => {
    setIsAdding(false); // Hide the input view on blur
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={{ flex: 1 }}>
          <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
              <View
                style={{
                  backgroundColor: Colors.light.primary,
                  height: 200,
                }}
              />
            }
          >
            <ThemedView>
              <ThemedText type="title">Tasks</ThemedText>
            </ThemedView>
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
            {isAdding && (
              <View style={getDynamicStyles(colorScheme).inputContainer}>
                <TextInput
                  ref={inputRef}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Enter task description"
                  style={getDynamicStyles(colorScheme).input}
                  onSubmitEditing={() =>
                    handleSaveTask(
                      inputText,
                      setInputText,
                      setIsAdding,
                      todos,
                      setTodos
                    )
                  }
                  returnKeyType="done"
                  onBlur={handleInputBlur} // Handle blur event
                />
              </View>
            )}
            <TodoList
              todos={sortedTodos}
              toggleCompleted={(id) => toggleCompleted(todos, setTodos, id)}
              editTodo={(id, newText) => editTodo(id, newText, todos, setTodos)}
              setTodos={setTodos}
            />
          </ParallaxScrollView>
          <AddTodoButton
            onPress={() => handleAddButtonPress(setIsAdding, inputRef)}
          />
          <ClearCompletedButton
            onPress={() => clearCompletedTasks(todos, setTodos)}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const getDynamicStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  inputContainer: {
    backgroundColor: colorScheme === 'dark' ? Colors.dark.background : 'white',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.light.primary,
  },
  input: {
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
    color: colorScheme === 'dark' ? 'white' : 'black',
    backgroundColor: colorScheme === 'dark' ? '#303030' : 'white',
    borderRadius: 4,
  },
});
