import { useContext, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView } from "react-native";
import { Link } from "expo-router";
import { AppButton } from "@/components";
import TodoContext, { Todo } from "@/context/Todo.context";
import Card from "@/components/Card";

export default function Index() {
  const { todos } = useContext(TodoContext);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openPopup = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  };

  const closePopup = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.todoHeader}>My Notes</Text>
        </View>

        {/* Todo List */}
        <ScrollView
          style={styles.todoContainer}
          contentContainerStyle={styles.todoContentContainer}
        >
          {todos.length > 0 ? (
            todos
              .slice()
              .reverse()
              .map((todo) => (
                <Card key={todo.id} todo={todo} onPress={() => openPopup(todo)} />
              ))
          ) : (
            <View style={styles.noTodoContainer}>
              <Text style={styles.noTodoText}>No notes found</Text>
              <Text style={styles.noTodoSubText}>Tap "Create Note" to add your first note</Text>
            </View>
          )}
        </ScrollView>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Link asChild href="/create">
            <AppButton>
              <Text style={styles.buttonText}>Create Note</Text>
            </AppButton>
          </Link>
        </View>

        {/* Modal for popup */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closePopup}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedTodo && (
                <>
                  <Text style={styles.modalTitle}>{selectedTodo.text}</Text>
                  <Text style={styles.modalTimestamp}>
                    Created at: {selectedTodo.timestamp
                      ? new Date(selectedTodo.timestamp).toLocaleString()
                      : "No timestamp"}
                  </Text>
                  <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  todoHeader: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 1,
  },
  todoContainer: {
    flex: 1,
  },
  todoContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 20,
  },
  noTodoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noTodoText: {
    fontSize: 20,
    color: "#000000",
    fontStyle: "italic",
    opacity: 0.7,
  },
  noTodoSubText: {
    fontSize: 16,
    color: "#000000",
    marginTop: 10,
    opacity: 0.7,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#000000",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  modalTimestamp: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});