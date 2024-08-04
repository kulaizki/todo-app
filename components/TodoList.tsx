import React from 'react';
import { SafeAreaView } from 'react-native';
import TodoItem from '@/components/TodoItem';
import { TodoListProps } from '@/types';

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleCompleted,
  editTodo,
}) => {
  return (
    <SafeAreaView>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          item={todo}
          toggleCompleted={toggleCompleted}
          editTodo={editTodo} // Pass editTodo to TodoItem
        />
      ))}
    </SafeAreaView>
  );
};

export default TodoList;
