import { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import TodoList from "@/components/TodoList";
import FloatingActionButton from "@/components/FloatingActionButton";
import { toggleCompleted, deleteTodo, handleAddButtonPress } from "@/utils/todo";
import { Todo } from "@/types/index";

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "First quest", completed: false },
    { id: "2", text: "Second quest", completed: false },
  ]);

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
        {/* <AddTodo addTodo={(text) => addTodo(todos, setTodos, text)} /> */}
        <TodoList
          todos={todos}
          toggleCompleted={(id) => toggleCompleted(todos, setTodos, id)}
          deleteTodo={(id) => deleteTodo(todos, setTodos, id)}
        />
      </ParallaxScrollView>
      <FloatingActionButton onPress={() => handleAddButtonPress(todos, setTodos)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});