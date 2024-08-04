import { Todo } from '@/types/index';
import { TextInput } from 'react-native';
import React from 'react';

export const addTodo = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  text: string
) => {
  setTodos((prevTodos) => [
    ...prevTodos,
    {
      id: Math.random().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    },
  ]);
};

export const toggleCompleted = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  id: string
) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

export const deleteTodo = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  id: string
) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};

export const handleAddButtonPress = (
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>,
  inputRef: React.RefObject<TextInput>
) => {
  setIsAdding(true);
  setTimeout(() => {
    inputRef.current?.focus();
  }, 100);
};

export const handleSaveTask = (
  inputText: string,
  setInputText: React.Dispatch<React.SetStateAction<string>>,
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  if (inputText.trim()) {
    addTodo(todos, setTodos, inputText);
    setInputText('');
    setIsAdding(false);
  }
};

export const editTodo = (
  id: string,
  newText: string,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  ));
};

export const sortTodos = (
  todos: Todo[],
  sortOption: 'time' | 'completion'
): Todo[] => {
  return [...todos].sort((a, b) => {
    if (sortOption === 'time') {
      return b.createdAt.getTime() - a.createdAt.getTime(); // Newest first
    } else {
      return Number(a.completed) - Number(b.completed); // Completed items last
    }
  });
};