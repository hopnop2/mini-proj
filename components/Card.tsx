import { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import TodoContext, { Todo } from "@/context/Todo.context";

interface CardProps {
  todo: Todo;
  onPress: () => void;
}

export default function Card({ todo, onPress }: CardProps) {
  const { removeTodo } = useContext(TodoContext);

  const handleRemoveTodo = (id: number) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeTodo?.(id),
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.todoCard}
      onPress={onPress}
      onLongPress={() => handleRemoveTodo(todo.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.todoText}>{todo.text}</Text>
      <Text style={styles.todoTimestamp}>
        {todo.timestamp
          ? new Date(todo.timestamp).toLocaleString()
          : "No timestamp"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 16,
    color: "#000000",
  },
  todoTimestamp: {
    fontSize: 12,
    color: "#666666",
    marginTop: 5,
  },
});