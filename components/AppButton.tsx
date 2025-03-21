import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Props interface for AppButton component
interface AppButtonProps {
  onPress?: () => void;
  children?: React.ReactNode; // รองรับทั้งข้อความและไอคอน
}

// AppButton Component with Black & White Theme
export default function AppButton({
  children = "Create Note",
  onPress = () => {},
}: AppButtonProps) {
  return (
    <TouchableOpacity
      style={styles.createTodoButton}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {children}
    </TouchableOpacity>
  );
}

// Styles for Black & White themed button
const styles = StyleSheet.create({
  createTodoButton: {
    backgroundColor: "#000000", // สีดำล้วน
    paddingHorizontal: 30, // เพิ่มความกว้าง
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFFFFF", // ขอบสีขาว
    alignItems: "center",
    elevation: 4, // เงาสำหรับ Android
    shadowColor: "#FFFFFF", // เงาสำหรับ iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});