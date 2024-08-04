import React from "react";
import { View, StyleSheet } from "react-native";
import SortButton from "./SortButton";
import { SortButtonsContainerProps } from "@/types";

const SortButtonsContainer: React.FC<SortButtonsContainerProps> = ({
  sortOption,
  setSortOption,
}) => {
  return (
    <View style={styles.container}>
      <SortButton
        title="Sort by Date"
        onPress={() => setSortOption("date")}
        isActive={sortOption === "date"}
      />
      <SortButton
        title="Sort by Completion"
        onPress={() => setSortOption("completion")}
        isActive={sortOption === "completion"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});

export default SortButtonsContainer;
