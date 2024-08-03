import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import TodoItem from '@/components/TodoItem';

export default function HomeScreen() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'First todo', completed: false },
    { id: '2', text: 'Second todo', completed: false },
  ]);

  const toggleCompleted = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <View style={{
            backgroundColor: Colors.light.primary,
            height: 200,
          }}/>
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Quests</ThemedText>
        </ThemedView>
        <ThemedText>What do we have to complete today?</ThemedText>
        {todos.map(todo => (
          <TodoItem key={todo.id} item={todo} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} />
        ))}
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});