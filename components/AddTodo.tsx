import React, { useState } from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';
import { AddTodoProps } from '@/types';

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && <Button title="Add Task" onPress={handleAddTodo} />}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40, 
  },
});

export default AddTodo;