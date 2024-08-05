import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Colors } from '@/constants/Colors';
import { DeleteButtonProps } from '@/types/index';
import { handleDelete } from '@/utils/todo';

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, todos, setTodos }) => {
  const onPress = async () => {
    try {
      if (todos && setTodos) {
        await handleDelete(todos, setTodos, id);
      } else {
        console.warn('Todos or setTodos is missing');
      }
    } catch (error) {
      console.error('Failed to handle delete:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="trash-can-outline" size={24} color={Colors.light.danger} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeleteButton;
