import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TodoItemProps } from '@/types';
import { Colors } from '@/constants/Colors';

const TodoItem: React.FC<TodoItemProps> = ({ item, toggleCompleted, deleteTodo }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity 
        style={[styles.toggle, item.completed ? styles.completedToggle : styles.incompleteToggle]} 
        onPress={() => toggleCompleted(item.id)}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, item.completed ? styles.completed : null]}>
          {item.text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
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
  toggle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#033c87',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedToggle: {
    backgroundColor: Colors.light.primary,
  },
  incompleteToggle: {
    backgroundColor: 'transparent',
  },
});

export default TodoItem;