import { useContext } from "react";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // เพิ่มไอคอนจาก expo

import { AppButton } from "@/components";
import TodoContext from "@/context/Todo.context";
import Card from "@/components/Card";

export default function Index() {
  const { todos } = useContext(TodoContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Icon */}
        <View style={styles.headerContainer}>
          <Ionicons name="book-outline" size={32} color="#000000" style={styles.headerIcon} />
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
              .map((todo) => <Card key={todo.id} todo={todo} />)
          ) : (
            <View style={styles.noTodoContainer}>
              <Ionicons name="document-outline" size={48} color="#000000" style={styles.noTodoIcon} />
              <Text style={styles.noTodoText}>No notes found</Text>
              <Text style={styles.noTodoSubText}>Tap "Create Note" to add your first note</Text>
            </View>
          )}
        </ScrollView>

        {/* Button with Icon */}
        <View style={styles.buttonContainer}>
          <Link asChild href="/create">
            <AppButton>
              <Ionicons name="add" size={24} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Create Note</Text>
            </AppButton>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // พื้นหลังสีขาว
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row", // จัดไอคอนและข้อความในแนวนอน
    alignItems: "center",
    justifyContent: "center", // จัดให้อยู่กึ่งกลาง
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    backgroundColor: "#FFFFFF", // พื้นหลังสีขาว
    elevation: 2, // เงาสำหรับ Android
    shadowColor: "#000000", // เงาสำหรับ iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerIcon: {
    marginRight: 10, // ระยะห่างจากไอคอนถึงข้อความ
  },
  todoHeader: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.1)", // เงาใต้ตัวอักษร
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  todoContainer: {
    flex: 1,
  },
  todoContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 20, // ระยะห่างระหว่างการ์ด
  },
  noTodoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noTodoIcon: {
    marginBottom: 15, // ระยะห่างจากไอคอนถึงข้อความ
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
    alignItems: "center", // จัดปุ่มตรงกลาง
    elevation: 2, // เงาสำหรับ Android
    shadowColor: "#000000", // เงาสำหรับ iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonIcon: {
    marginRight: 5, // ระยะห่างจากไอคอนถึงข้อความในปุ่ม
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});