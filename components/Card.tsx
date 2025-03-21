import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import TodoContext, { Todo } from "@/context/Todo.context";

// Props interface for Card component
interface CardProps {
  todo: Todo;
}

// Card Component with Black & White Theme
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
      activeOpacity={0.7} // ปรับ opacity เมื่อกด
    >
      {/* Checkbox for toggling todo status */}
      <Checkbox.Item
        label=""
        status={todo.done ? "checked" : "unchecked"}
        onPress={() => toggleTodo?.(todo.id)}
        color="#000000" // สี Checkbox เป็นดำ
      />

      {/* Todo title */}
      <Text style={styles.todoTitle}>{todo.text}</Text>

      {/* Todo timestamp */}
      <Text style={styles.timestamp}>
        {new Date(todo.timestamp!).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </TouchableOpacity>
  );
}

// Styles for the Card component with Black & White Theme
const styles = StyleSheet.create({
  todoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: "#FFFFFF", // พื้นหลังสีขาว
    borderWidth: 1, // เส้นขอบสีดำ
    borderColor: "#000000",
    borderRadius: 8, // มุมโค้งเล็กน้อย
    elevation: 2, // เงาสำหรับ Android
    shadowColor: "#000000", // เงาสำหรับ iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "600", // หนาขึ้นเล็กน้อย
    color: "#000000", // สีดำ
    flex: 1, // ขยายเต็มพื้นที่
    marginLeft: 10, // ระยะห่างจาก Checkbox
  },
  timestamp: {
    fontSize: 14,
    color: "#666666", // สีเทาเข้มเพื่อไม่ให้เด่นเกิน
    marginLeft: 10,
  },
});