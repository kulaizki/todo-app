export interface AddTodoProps {
  addTodo: (text: string) => void;
}

export interface TodoItemProps {
  item: {
    id: string;
    text: string;
    completed: boolean;
  };
  toggleCompleted: (id: string) => void;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoListProps {
  todos: Todo[];
  toggleCompleted: (id: string) => void;
}