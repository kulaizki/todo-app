import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import TodoList from '@/components/TodoList';
import FloatingActionButton from '@/components/FloatingActionButton';
import { toggleCompleted, handleAddButtonPress, handleSaveTask } from '@/utils/todo';
import { Todo } from '@/types/index';
import SortButton from '@/components/SortButton';

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'First quest', completed: false, createdAt: new Date() },
    { id: '2', text: 'Second quest', completed: false, createdAt: new Date() },
    { id: '3', text: 'Third quest', completed: false, createdAt: new Date() },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<'date' | 'completion'>('date');
  const inputRef = useRef<TextInput>(null);

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortOption === 'date') {
      return b.createdAt.getTime() - a.createdAt.getTime(); // Newest first
    } else {
      return Number(a.completed) - Number(b.completed); // Completed items last
    }
  });

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
              onSubmitEditing={() => handleSaveTask(inputText, setInputText, setIsAdding, todos, setTodos)}
              returnKeyType="done"
            />
          </View>
        )}
        <View style={styles.sortButtons}>
          <SortButton
            title="Sort by Date"
            onPress={() => setSortOption('date')}
            isActive={sortOption === 'date'}
          />
          <SortButton
            title="Sort by Completion"
            onPress={() => setSortOption('completion')}
            isActive={sortOption === 'completion'}
          />
        </View>
        <TodoList
          todos={sortedTodos}
          toggleCompleted={(id) => toggleCompleted(todos, setTodos, id)}
        />
      </ParallaxScrollView>
      <FloatingActionButton onPress={() => handleAddButtonPress(setIsAdding, inputRef)} />
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
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
