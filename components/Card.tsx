import { useContext, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TodoContext, { Todo } from "@/context/Todo.context";

// Custom Delete Alert Component
const DeleteAlert = ({
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
              <Text style={styles.alertButtonText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ปรับ interface CardProps
interface CardProps {
  todo: Todo;
  onPress: () => void;
  onLongPress?: () => void; // เพิ่ม onLongPress เป็น optional
}

export default function Card({ todo, onPress, onLongPress }: CardProps) {
  const { removeTodo } = useContext(TodoContext);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleRemoveTodo = () => {
    setAlertVisible(true); // แสดง Custom Alert เมื่อกดค้าง
  };

  const confirmDelete = () => {
    removeTodo?.(todo.id); // ลบ Todo
    setAlertVisible(false); // ปิด Alert
  };

  const cancelDelete = () => {
    setAlertVisible(false); // ปิด Alert โดยไม่ลบ
  };

  return (
    <>
      <TouchableOpacity
        style={styles.todoCard}
        onPress={onPress}
        onLongPress={onLongPress || handleRemoveTodo} // ใช้ onLongPress หรือ handleRemoveTodo
        activeOpacity={0.7}
      >
        <Text style={styles.todoText}>{todo.text}</Text>
        <Text style={styles.todoTimestamp}>
          {todo.timestamp
            ? new Date(todo.timestamp).toLocaleString()
            : "ไม่มี timestamp"}
        </Text>
      </TouchableOpacity>

      {/* เรียกใช้ Custom Alert */}
      <DeleteAlert
        visible={alertVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
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
  // สไตล์สำหรับ Custom Alert
  alertOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // พื้นหลังโปร่งแสง
    justifyContent: "center",
    alignItems: "center",
  },
  alertContent: {
    backgroundColor: "#FFFFFF", // พื้นหลังสีขาว
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000", // ขอบสีดำ
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000", // ข้อความสีดำ
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
    backgroundColor: "#CCCCCC", // ปุ่มยกเลิกสีเทา
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  alertConfirmButton: {
    backgroundColor: "#FF0000", // ปุ่มลบสีแดง
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  alertButtonText: {
    color: "#FFFFFF", // ข้อความในปุ่มสีขาว
    fontWeight: "bold",
    fontSize: 16,
  },
});