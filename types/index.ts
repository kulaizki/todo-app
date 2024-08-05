export interface TodoItemProps {
  item: {
    id: string;
    text: string;
    completed: boolean;
  };
  toggleCompleted: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
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
  editTodo: (id: string, newText: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;  // Add this line
}


export interface SortButtonProps {
  title: string;
  onPress: () => void;
  isActive: boolean;
}

export interface AddTodoButtonProps {
  onPress: () => void;
}

export interface SortButtonsContainerProps {
  sortOption: 'time' | 'completion';
  setSortOption: React.Dispatch<React.SetStateAction<'time' | 'completion'>>;
}

export interface ClearCompletedButtonProps {
  onPress: () => void;
}

export interface DeleteButtonProps {
  id: string;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface SortDropdownProps {
  sortOption: 'time' | 'completion';
  setSortOption: React.Dispatch<React.SetStateAction<'time' | 'completion'>>;
}