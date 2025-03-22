import { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

import { AppButton } from "@/components";
import TodoContext from "@/context/Todo.context";

export default function CreateTodo() {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState<string>("");
  const navigation = useNavigation();

  const handleAddTodo = () => {
    if (!text.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณาป้อนบันทึก", [{ text: "ตกลง" }]);
      return;
    }
    addTodo?.(text);
    setText("");
    Alert.alert("สำเร็จ", "เพิ่มบันทึกสำเร็จ", [{ text: "ตกลง" }]);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Ionicons name="create-outline" size={34} color="#000000" style={styles.headerIcon} />
        <Text style={styles.headerText}>เพิ่มบันทึกของคุณ</Text>
        <View style={styles.headerUnderline} />
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <TextInput
          label="ป้อนบันทึก"
          value={text}
          onChangeText={setText}
          mode="outlined"
          placeholder="เช่น ซื้อของใช้"
          style={[styles.textInput, { borderRadius: 10 }]}
          outlineColor="#000000"
          activeOutlineColor="#000000"
          textColor="#000000"
          placeholderTextColor="#666666"
        />

        <TouchableOpacity style={styles.createButton} onPress={handleAddTodo}>
          <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>สร้างบันทึก</Text>
        </TouchableOpacity>
      </View>

      {/* Circular Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerIcon: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
  headerUnderline: {
    height: 2,
    width: "60%",
    backgroundColor: "#000000",
    marginTop: 10,
  },
  formContainer: {
    marginVertical: 20,
    gap: 30,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Circular Back Button Styles
  backButton: {
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#000000",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});