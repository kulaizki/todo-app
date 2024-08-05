import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '@/types/index';
import { TextInput, Keyboard } from 'react-native';
import React from 'react';

export const getTodosFromStorage = async (): Promise<Todo[]> => {
  try {
    const todosString = await AsyncStorage.getItem('todos');
    if (todosString) {
      const todos = JSON.parse(todosString) as Todo[];
      return todos.map(todo => ({
        ...todo,
        createdAt: new Date(todo.createdAt), // Ensure createdAt is a Date object
      }));
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch todos from storage:', error);
    return [];
  }
};

const saveTodosToStorage = async (todos: Todo[]) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos to storage:', error);
  }
};

export const addTodo = async (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  text: string
) => {
  try {
    const newTodo = {
      id: Math.random().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  } catch (error) {
    console.error('Failed to add todo:', error);
  }
};

export const toggleCompleted = async (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  id: string
) => {
  try {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  } catch (error) {
    console.error('Failed to toggle todo completion:', error);
  }
};

export const deleteTodo = async (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  id: string
) => {
  try {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};

export const handleAddButtonPress = (
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>,
  inputRef: React.RefObject<TextInput>
) => {
  try {
    setIsAdding(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  } catch (error) {
    console.error('Failed to handle add button press:', error);
  }
};

export const handleSaveTask = async (
  inputText: string,
  setInputText: React.Dispatch<React.SetStateAction<string>>,
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  try {
    if (inputText.trim()) {
      await addTodo(todos, setTodos, inputText);
      setInputText('');
      setIsAdding(false);
    }
  } catch (error) {
    console.error('Failed to save task:', error);
  }
};

export const editTodo = async (
  id: string,
  newText: string,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  try {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  } catch (error) {
    console.error('Failed to edit todo:', error);
  }
};

export const sortTodos = (
  todos: Todo[],
  sortOption: 'time' | 'completion'
): Todo[] => {
  try {
    return [...todos].sort((a, b) => {
      if (!(a.createdAt instanceof Date) || !(b.createdAt instanceof Date)) {
        throw new Error('createdAt is not a Date object');
      }

      if (sortOption === 'time') {
        return b.createdAt.getTime() - a.createdAt.getTime(); // Newest first
      } else {
        return Number(a.completed) - Number(b.completed); // Completed items last
      }
    });
  } catch (error) {
    console.error('Failed to sort todos:', error);
    return todos; // Return unsorted todos in case of error
  }
};

export const clearCompletedTasks = async (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  try {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    await saveTodosToStorage(updatedTodos);
  } catch (error) {
    console.error('Failed to clear completed tasks:', error);
  }
};

export const handleSave = async (
  newText: string,
  itemId: string,
  editTodo: (id: string, newText: string) => void,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setNewText: React.Dispatch<React.SetStateAction<string>>,
  inputRef: React.RefObject<TextInput>
) => {
  try {
    if (newText.trim()) {
      editTodo(itemId, newText); 
      setIsEditing(false);
      Keyboard.dismiss(); 
    }
  } catch (error) {
    console.error('Failed to save edited todo:', error);
  }
};

export const handleKeyPress = (
  event: { nativeEvent: { key: string } },
  handleSave: () => void
) => {
  try {
    if (event.nativeEvent.key === 'Enter') {
      handleSave(); 
    }
  } catch (error) {
    console.error('Failed to handle key press:', error);
  }
};

export const handleDelete = async (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  id: string
) => {
  try {
    await deleteTodo(todos, setTodos, id);
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};