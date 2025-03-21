import { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";

import { AppButton } from "@/components";
import TodoContext from "@/context/Todo.context";

// CreateTodo Component with Black & White Theme
export default function CreateTodo() {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState<string>("");

  // Handle adding a new todo with validation
  const handleAddTodo = () => {
    if (!text.trim()) {
      Alert.alert("Error", "Please enter a todo", [{ text: "OK" }]);
      return;
    }

    addTodo?.(text);
    setText("");
    Alert.alert("Success", "Todo added successfully", [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.headerText}>Add Your Todo</Text>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <TextInput
          label="Enter Todo"
          value={text}
          onChangeText={setText} // Simplified handler
          mode="outlined"
          placeholder="e.g., Buy groceries"
          style={styles.textInput}
          outlineColor="#000000" // Black outline
          activeOutlineColor="#000000" // Active black outline
          textColor="#000000" // Black text
          placeholderTextColor="#666666" // Subtle gray for placeholder
        />

        <AppButton onPress={handleAddTodo}>Create Todo</AppButton>
      </View>
    </View>
  );
}

// Styles for a sleek Black & White Theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Pure white background
    paddingHorizontal: 20, // More horizontal padding for balance
    paddingTop: 40, // Extra top padding for a modern feel
  },
  headerText: {
    fontSize: 28, // Slightly larger for prominence
    fontWeight: "700", // Bold for emphasis
    color: "#000000", // Pure black text
    marginBottom: 30, // Space below header
    letterSpacing: 0.5, // Subtle spacing for elegance
  },
  formContainer: {
    marginVertical: 20,
    gap: 25, // Slightly larger gap for better separation
  },
  textInput: {
    backgroundColor: "#FFFFFF", // White input background
    fontSize: 16, // Readable font size
  },
});