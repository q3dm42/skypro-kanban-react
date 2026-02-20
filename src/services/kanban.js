import { apiGet, apiPost, apiPut, apiDelete } from "./api";
import { API_ENDPOINTS } from "../config/api";

/**
 * Получить все задачи
 */
export async function getTasks() {
  const response = await apiGet(API_ENDPOINTS.KANBAN_TASKS);
  return response.tasks || [];
}

/**
 * Получить задачу по ID
 */
export async function getTaskById(id) {
  const response = await apiGet(API_ENDPOINTS.KANBAN_TASK_BY_ID(id));
  return response.task;
}

/**
 * Создать новую задачу
 * @param {Object} taskData - данные задачи
 * @param {string} taskData.title - название задачи
 * @param {string} taskData.topic - тема/категория
 * @param {string} taskData.status - статус
 * @param {string} taskData.description - описание
 * @param {string} taskData.date - дата
 */
export async function createTask(taskData) {
  const payload = {
    title: taskData.title || "Новая задача",
    topic: taskData.topic || "Research",
    status: taskData.status || "Без статуса",
    description: taskData.description || "",
    date: taskData.date || new Date().toISOString(),
  };

  const response = await apiPost(API_ENDPOINTS.KANBAN_TASKS, payload);
  return response.tasks || [];
}

/**
 * Обновить задачу
 * @param {string} id - ID задачи
 * @param {Object} taskData - данные для обновления
 */
export async function updateTask(id, taskData) {
  const payload = {
    title: taskData.title || "Новая задача",
    topic: taskData.topic || "Research",
    status: taskData.status || "Без статуса",
    description: taskData.description || "",
    date: taskData.date || new Date().toISOString(),
  };

  const response = await apiPut(API_ENDPOINTS.KANBAN_TASK_BY_ID(id), payload);
  return response.tasks || [];
}

/**
 * Удалить задачу
 * @param {string} id - ID задачи
 */
export async function deleteTask(id) {
  const response = await apiDelete(API_ENDPOINTS.KANBAN_TASK_BY_ID(id));
  return response.tasks || [];
}
