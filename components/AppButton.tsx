import { useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

// Props interface for AppButton component
interface AppButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

// ใช้ forwardRef เพื่อให้ AppButton รองรับ ref
const AppButton = React.forwardRef<TouchableOpacity, AppButtonProps>(
  (
    { onPress = () => {}, children = "Create Note", style, ...rest },
    ref
  ) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    };

    return (
      <TouchableOpacity
        ref={ref} // ส่ง ref ไปให้ TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        {...rest}
      >
        <Animated.View
          style={[
            styles.createTodoButton,
            style,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  createTodoButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export { AppButton };