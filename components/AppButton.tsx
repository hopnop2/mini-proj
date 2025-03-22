import { useRef } from "react";
import { Animated, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

// Props interface for AppButton component
interface AppButtonProps {
  onPress?: () => void; // ฟังก์ชันเมื่อกดปุ่ม (optional)
  children?: React.ReactNode; // เนื้อหาภายในปุ่ม (เช่น ข้อความหรือไอคอน)
  style?: ViewStyle; // สไตล์ที่ส่งเข้ามา (optional)
}

const AppButton: React.FC<AppButtonProps> = ({
  onPress = () => {},
  children = "Create Note", // ค่าเริ่มต้นถ้าไม่ส่ง children
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // ค่า scale เริ่มต้นที่ 1
  const opacityAnim = useRef(new Animated.Value(1)).current; // ค่า opacity เริ่มต้นที่ 1

  // ฟังก์ชันอนิเมชั่นเมื่อกดปุ่ม
  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95, // หดตัวเล็กน้อยเมื่อกด
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8, // ลด opacity เล็กน้อย
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // ฟังก์ชันอนิเมชั่นเมื่อปล่อยปุ่ม
  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1, // กลับสู่ขนาดเดิม
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1, // กลับสู่ opacity เดิม
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1} // ปิดการเปลี่ยน opacity เริ่มต้นของ TouchableOpacity
    >
      <Animated.View
        style={[
          styles.createTodoButton, // สไตล์พื้นฐาน
          style, // สไตล์ที่ส่งเข้ามา
          {
            transform: [{ scale: scaleAnim }], // ใช้ scale animation
            opacity: opacityAnim, // ใช้ opacity animation
          },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

// Styles for Black & White themed button
const styles = StyleSheet.create({
  createTodoButton: {
    backgroundColor: "#000000", // สีดำล้วน
    paddingHorizontal: 30, // ความกว้าง
    paddingVertical: 15, // ความสูง
    borderRadius: 30, // ขอบโค้ง
    borderWidth: 2,
    borderColor: "#FFFFFF", // ขอบสีขาว
    alignItems: "center", // จัดกึ่งกลาง
    elevation: 4, // เงาสำหรับ Android
    shadowColor: "#FFFFFF", // เงาสำหรับ iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default AppButton;