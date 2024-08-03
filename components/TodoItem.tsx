import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TodoItemProps {
  item: {
    id: string;
    text: string;
    completed: boolean;
  };
  toggleCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, toggleCompleted, deleteTodo }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleCompleted(item.id)}>
        <Text style={[styles.text, item.completed ? styles.completed : null]}>{item.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  delete: {
    fontSize: 24,
    color: 'red',
  },
});

export default TodoItem;