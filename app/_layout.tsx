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
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="create"
            options={{
              headerTitle: "Create Todo",
            }}
          />
          <Stack.Screen
            name="about"
            options={{
              headerTitle: "About",
            }}
          />
        </Stack>
      </TodoProvider>
    </PaperProvider>
  );
}