import { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/AddTodo";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function HomeScreen() {
  const [todos, setTodos] = useState([
    { id: "1", text: "First quest", completed: false },
    { id: "2", text: "Second quest", completed: false },
  ]);

  const addTodo = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text, completed: false },
    ]);
  };

  const toggleCompleted = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddButtonPress = () => {
    addTodo('New Task');
  };

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
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
        />
      </ParallaxScrollView>
    <FloatingActionButton onPress={handleAddButtonPress} />
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
