import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";
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
  getTodosFromStorage
} from "@/utils/todo";
import { Todo } from "@/types/index";
import SortDropdown from "@/components/SortDropdown"; 

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<"time" | "completion">("time");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const storedTodos = await getTodosFromStorage();
      setTodos(storedTodos);
    };
    fetchTodos();
  }, []);

  const sortedTodos = sortTodos(todos, sortOption);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Tasks</ThemedText>
        </ThemedView>
        <ThemedText type='defaultSemiBold'>What do we have to complete today?</ThemedText>
        {isAdding && (
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Enter task description"
              style={styles.input}
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
            />
          </View>
        )}
        <SortDropdown
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <TodoList
          todos={sortedTodos}
          toggleCompleted={(id) => toggleCompleted(todos, setTodos, id)}
          editTodo={(id, newText) => editTodo(id, newText, todos, setTodos)}
          setTodos={setTodos} // Pass setTodos here
        />
      </ParallaxScrollView>
      <AddTodoButton
        onPress={() => handleAddButtonPress(setIsAdding, inputRef)}
      />
      <ClearCompletedButton
        onPress={() => clearCompletedTasks(todos, setTodos)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.light.primary,
  },
  input: {
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
