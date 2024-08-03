import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';

interface AddTodoProps {
  addTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    addTodo(text);
    setText('');
  };

  return (
    <>
      <TextInput value={text} onChangeText={setText} placeholder="New Task" />
      <Button title="Add Quest" onPress={handleAddTodo} />
    </>
  );
};

export default AddTodo;