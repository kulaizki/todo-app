import React from 'react';
import TodoItem from '@/components/TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
}

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