import React, { useState } from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';

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
      <TextInput 
        style={styles.input} 
        value={text} 
        onChangeText={setText} 
        placeholder="New Task" 
      />
      <Button title="Add Quest" onPress={handleAddTodo} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40, 
    padding: 10,
  },
});

export default AddTodo;