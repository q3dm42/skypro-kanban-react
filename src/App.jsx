import { useCallback, useState } from "react";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { AuthContext } from "./context/AuthContext";
import { TaskContext } from "./context/TaskContext";
import { getCurrentUser, isAuthenticated } from "./services/auth";
import {
  getTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "./services/kanban";

function App() {
  const authorized = isAuthenticated();
  const initialUser = authorized ? getCurrentUser() : null;

  const [isAuth, setIsAuth] = useState(authorized);
  const [user, setUser] = useState(initialUser);
  const [authLoading] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState("");

  const handleLogin = useCallback((userData = null) => {
    setIsAuth(true);
    setUser(userData || getCurrentUser());
  }, []);

  const clearTasks = useCallback(() => {
    setTasks([]);
    setTasksError("");
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuth(false);
    setUser(null);
    clearTasks();
  }, [clearTasks]);

  const fetchTasks = useCallback(async () => {
    setTasksLoading(true);
    setTasksError("");
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setTasksError(err.message || "Ошибка загрузки задач");
    } finally {
      setTasksLoading(false);
    }
  }, []);

  const isSameTask = (task, id) =>
    task && (task._id === id || task.id === id);

  const createTask = useCallback(async (taskData) => {
    setTasksError("");
    try {
      const result = await apiCreateTask(taskData);
      if (Array.isArray(result)) {
        setTasks(result);
      } else if (result) {
        setTasks((prevTasks) => [...prevTasks, result]);
      }
    } catch (err) {
      setTasksError(err.message || "Ошибка создания задачи");
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    setTasksError("");
    try {
      const result = await apiUpdateTask(id, taskData);
      if (Array.isArray(result)) {
        setTasks(result);
      } else if (result) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (isSameTask(task, id) ? result : task)),
        );
      }
    } catch (err) {
      setTasksError(err.message || "Ошибка обновления задачи");
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    setTasksError("");
    try {
      const result = await apiDeleteTask(id);
      if (Array.isArray(result)) {
        setTasks(result);
      } else {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => !isSameTask(task, id)),
        );
      }
    } catch (err) {
      setTasksError(err.message || "Ошибка удаления задачи");
      throw err;
    }
  }, []);

  const authValue = {
    isAuth,
    user,
    loading: authLoading,
    handleLogin,
    handleLogout,
  };

  const taskValue = {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    clearTasks,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <TaskContext.Provider value={taskValue}>
        <AppRoutes />
      </TaskContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
