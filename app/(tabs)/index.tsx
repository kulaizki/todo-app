import React, { useState, useRef } from "react";
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
} from "@/utils/todo";
import { Todo } from "@/types/index";
import SortButtonsContainer from "@/components/SortButtonsContainer";

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "First quest", completed: false, createdAt: new Date() },
    { id: "2", text: "Second quest", completed: false, createdAt: new Date() },
    { id: "3", text: "This description is super super duper super duper super super super long", completed: false, createdAt: new Date() },
  ]);

  const [inputText, setInputText] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<"time" | "completion">("time");
  const inputRef = useRef<TextInput>(null);

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
        <ThemedText>What do we have to complete today?</ThemedText>
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
        <SortButtonsContainer
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <TodoList
          todos={sortedTodos}
          toggleCompleted={(id) => toggleCompleted(todos, setTodos, id)}
          editTodo={(id, newText) => editTodo(id, newText, todos, setTodos)}
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
  },
  input: {
    height: 40,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
});
