import { TodoProvider } from "@/context/Todo.context";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <TodoProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false, // ซ่อน Header สำหรับหน้า index
            }}
          />
          <Stack.Screen
            name="create"
            options={{
              headerShown: false, // แสดง Header สำหรับหน้า create
              headerTitle: "Create Todo",
            }}
          />
          <Stack.Screen
            name="about"
            options={{
              headerShown: false, // แสดง Header สำหรับหน้า about
              headerTitle: "About",
            }}
          />
        </Stack>
      </TodoProvider>
    </PaperProvider>
  );
}