import React from 'react';
import { FlatList } from 'react-native';
import TodoItem from '@/components/TodoItem';
import { TodoListProps } from '@/types';

const TodoList: React.FC<TodoListProps> = ({ todos, toggleCompleted, deleteTodo }) => {
  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem
          item={item}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
        />
      )}
    />
  );
};

export default TodoList;
