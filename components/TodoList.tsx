import React from 'react';
import TodoItem from '@/components/TodoItem';
import { TodoListProps } from '@/types';

const TodoList: React.FC<TodoListProps> = ({ todos, toggleCompleted, deleteTodo }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoItem key={todo.id} item={todo} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} />
      ))}
    </>
  );
};

export default TodoList;