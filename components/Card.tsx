import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import TodoContext, { Todo } from "@/context/Todo.context";

// Props interface for Card component
interface CardProps {
  todo: Todo;
}

// Card Component
export default function Card({ todo }: CardProps) {
  const { removeTodo, toggleTodo } = useContext(TodoContext);

  // Function to handle todo deletion with confirmation alert
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
      onLongPress={() => handleRemoveTodo(todo.id)}
      activeOpacity={0.5}
      key={todo.id}
    >
      {/* Checkbox for toggling todo status */}
      <Checkbox.Item
        label=""
        status={todo.done ? "checked" : "unchecked"}
        onPress={() => toggleTodo?.(todo.id)}
      />

      {/* Todo title */}
      <Text style={styles.todoTitle}>{todo.text}</Text>

      {/* Todo timestamp */}
      <Text>
        {new Date(todo.timestamp!).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </TouchableOpacity>
  );
}

// Styles for the Card component
const styles = StyleSheet.create({
  todoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1, // Allow title to take available space
    marginLeft: 10, // Space between checkbox and title
  },
});
