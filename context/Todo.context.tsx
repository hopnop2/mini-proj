import { createContext, useState, ReactNode } from "react";

// Define Todo interface for type safety
export interface Todo {
  id: number;
  text: string;
  done: boolean;
  timestamp?: number;
}

// Define TodoContext type for context value
interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

// Initialize TodoContext with default empty implementations
export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  removeTodo: () => {},
});

// TodoProvider: Manages todo state and provides context
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Add a new todo with current timestamp
  const addTodo = (text: string): void => {
    const newTodo: Todo = {
      id: todos.length + 1, // Simple incremental ID
      text: text.trim(), // Trim whitespace for cleaner input
      done: false,
      timestamp: Date.now(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Toggle the completion status of a todo by ID
  const toggleTodo = (id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Remove a todo by ID
  const removeTodo = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Context value object
  const contextValue: TodoContextType = {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;