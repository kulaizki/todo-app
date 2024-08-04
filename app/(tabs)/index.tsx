import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import TodoList from '@/components/TodoList';
import FloatingActionButton from '@/components/FloatingActionButton';
import { toggleCompleted, deleteTodo, addTodo } from '@/utils/todo';
import { Todo } from '@/types/index';

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'First quest', completed: false },
    { id: '2', text: 'Second quest', completed: false },
    { id: '3', text: 'Third quest', completed: false },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handleAddButtonPress = () => {
    setIsAdding(true);
    // Delay focusing to ensure the component is rendered
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSaveTask = () => {
    if (inputText.trim()) {
      addTodo(todos, setTodos, inputText);
      setInputText('');
      setIsAdding(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
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
              onSubmitEditing={handleSaveTask}
              returnKeyType="done"
            />
          </View>
        )}
        <TodoList
          todos={todos}
          toggleCompleted={(id) => toggleCompleted(todos, setTodos, id)}
          deleteTodo={(id) => deleteTodo(todos, setTodos, id)}
        />
      </ParallaxScrollView>
      <FloatingActionButton onPress={handleAddButtonPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputContainer: {
    backgroundColor: 'white', 
    padding: 4,
  },
  input: {
    height: 40,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
});
