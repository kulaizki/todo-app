// components/SortButtonsContainer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SortButton from './SortButton';

interface SortButtonsContainerProps {
  sortOption: 'date' | 'completion';
  setSortOption: React.Dispatch<React.SetStateAction<'date' | 'completion'>>;
}

const SortButtonsContainer: React.FC<SortButtonsContainerProps> = ({ sortOption, setSortOption }) => {
  return (
    <View style={styles.container}>
      <SortButton
        title="Sort by Date"
        onPress={() => setSortOption('date')}
        isActive={sortOption === 'date'}
      />
      <SortButton
        title="Sort by Completion"
        onPress={() => setSortOption('completion')}
        isActive={sortOption === 'completion'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default SortButtonsContainer;
