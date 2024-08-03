import { Todo } from '@/types/index';

export const addTodo = (
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  text: string
) => {
  setTodos((prevTodos) => [
    ...prevTodos,
    { id: Math.random().toString(), text, completed: false },
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
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  addTodo(todos, setTodos, 'New Task');
};