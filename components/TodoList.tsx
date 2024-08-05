import React from 'react';
import { SafeAreaView } from 'react-native';
import TodoItem from '@/components/TodoItem';
import { TodoListProps } from '@/types';

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleCompleted,
  editTodo,
  setTodos,  
}) => {
  return (
    <SafeAreaView>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          item={todo}
          toggleCompleted={toggleCompleted}
          editTodo={editTodo}
          todos={todos}           
          setTodos={setTodos}    
        />
      ))}
    </SafeAreaView>
  );
};

export default TodoList;
