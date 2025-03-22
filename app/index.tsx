import { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { AppButton } from "@/components";
import { TodoContext as TodoContextInstance, Todo } from "@/context/Todo.context";
import Card from "@/components/Card";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Custom Alert Component (ปรับเป็นภาษาไทย)
const CustomAlert = ({
  visible,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>ลบรายการ</Text>
          <Text style={styles.alertMessage}>
            คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?
          </Text>
          <View style={styles.alertButtonContainer}>
            <TouchableOpacity
              style={styles.alertCancelButton}
              onPress={onCancel}
            >
              <Text style={styles.alertButtonText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.alertConfirmButton}
              onPress={onConfirm}
            >
              <Text style={styles.alertButtonText}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function Index() {
  const { todos, removeTodo } = useContext(TodoContextInstance);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // โหลดฟอนต์ของ Ionicons
  const [fontsLoaded] = useFonts({
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });

  // รอให้ฟอนต์โหลดก่อนเรนเดอร์
  if (!fontsLoaded) {
    return null;
  }

  const openPopup = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  };

  const closePopup = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  const showDeleteAlert = (todo: Todo) => {
    setTodoToDelete(todo);
    setAlertVisible(true);
  };

  const confirmDelete = () => {
    if (todoToDelete && removeTodo) {
      removeTodo(todoToDelete.id);
      setAlertVisible(false);
      setTodoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setAlertVisible(false);
    setTodoToDelete(null);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    setMenuVisible(false);
    console.log("Logged out");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerWrapper}>
            <Ionicons
              name="book-outline"
              size={34}
              color="#000000"
              style={styles.headerIconLeft}
              onLayout={() => console.log("Header icon rendered")}
            />
            <Text style={styles.todoHeader}>บันทึกของฉัน</Text>
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons
                name="person-outline"
                size={24}
                color="#000000"
                style={styles.headerIconRight}
                onLayout={() => console.log("Profile icon rendered")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerUnderline} />
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
                <Card
                  key={todo.id}
                  todo={todo}
                  onPress={() => openPopup(todo)}
                  onLongPress={() => showDeleteAlert(todo)}
                />
              ))
          ) : (
            <View style={styles.noTodoContainer}>
              <Text style={styles.noTodoText}>ไม่พบบันทึก</Text>
              <Text style={styles.noTodoSubText}>
                แตะปุ่มด้านล่างเพื่อเริ่มต้น
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <Link asChild href="/create">
            <AppButton style={styles.createButton}>
              <Ionicons
                name="create-outline"
                size={24}
                color="#FFFFFF"
                onLayout={() => console.log("Create icon rendered")}
              />
            </AppButton>
          </Link>
        </View>

        {/* Modal for Todo Details */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closePopup}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.modalScrollContent}>
                {selectedTodo && (
                  <>
                    <Text style={styles.modalTitle}>{selectedTodo.text}</Text>
                    <Text style={styles.modalTimestamp}>
                      สร้างเมื่อ:{" "}
                      {selectedTodo.timestamp
                        ? new Date(selectedTodo.timestamp).toLocaleString(
                            "th-TH"
                          )
                        : "ไม่มี timestamp"}
                    </Text>
                    <TouchableOpacity
                      onPress={closePopup}
                      style={styles.closeButton}
                    >
                      <Ionicons
                        name="close-circle-outline"
                        size={24}
                        color="#FFFFFF"
                      />
                      <Text style={styles.closeButtonText}>ปิด</Text>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Popup Menu */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={menuVisible}
          onRequestClose={toggleMenu}
        >
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={toggleMenu}
          >
            <View style={styles.menuContent}>
              <Link href="/about" asChild>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setMenuVisible(false)}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color="#000000"
                  />
                  <Text style={styles.menuText}>เกี่ยวกับ</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="settings-outline" size={20} color="#000000" />
                <Text style={styles.menuText}>ตั้งค่า</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={20} color="#FF0000" />
                <Text style={[styles.menuText, { color: "#FF0000" }]}>
                  ล็อกเอาท์
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Custom Alert */}
        <CustomAlert
          visible={alertVisible}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles (ปรับสไตล์สำหรับ Modal ที่เลื่อนได้)
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
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerIconLeft: {
    marginRight: 12,
  },
  headerIconRight: {
    marginLeft: 12,
  },
  todoHeader: {
    fontSize: 30,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "center",
  },
  headerUnderline: {
    height: 2,
    backgroundColor: "#000000",
    width: "50%",
    alignSelf: "center",
    marginBottom: 10,
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
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
  },
  createButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
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
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%", // จำกัดความสูงเพื่อให้เลื่อนได้
    borderWidth: 1,
    borderColor: "#000000",
  },
  modalScrollContent: {
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    textAlign: "center",
  },
  modalTimestamp: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 8,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContent: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 80,
    marginRight: 20,
    width: 150,
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  menuText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 10,
  },
  alertOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  alertButtonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  alertCancelButton: {
    backgroundColor: "#CCCCCC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  alertConfirmButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  alertButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});