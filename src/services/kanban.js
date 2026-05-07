import { apiGet, apiPost, apiPut, apiDelete } from "./api";
import { API_ENDPOINTS } from "../config/api";

function validateTaskPayload(taskData) {
  if (!taskData?.title?.trim()) {
    throw new Error("Поле «Название задачи» обязательно для заполнения");
  }

  if (!taskData?.description?.trim()) {
    throw new Error("Поле «Описание задачи» обязательно для заполнения");
  }

  if (!taskData?.topic?.trim()) {
    throw new Error("Поле «Категория» обязательно для заполнения");
  }

  if (!taskData?.status?.trim()) {
    throw new Error("Поле «Статус» обязательно для заполнения");
  }

  if (!taskData?.date) {
    throw new Error("Поле «Дата» обязательно для заполнения");
  }
}

export async function getTasks() {
  const response = await apiGet(API_ENDPOINTS.KANBAN_TASKS);
  return response.tasks || [];
}

export async function getTaskById(id) {
  const response = await apiGet(API_ENDPOINTS.KANBAN_TASK_BY_ID(id));
  return response.task;
}

export async function createTask(taskData) {
  validateTaskPayload(taskData);

  const payload = {
    title: taskData.title.trim(),
    topic: taskData.topic.trim(),
    status: taskData.status.trim(),
    description: taskData.description.trim(),
    date: taskData.date,
  };

  const response = await apiPost(API_ENDPOINTS.KANBAN_TASKS, payload);
  return response.tasks || response.task || [];
}

export async function updateTask(id, taskData) {
  validateTaskPayload(taskData);

  const payload = {
    title: taskData.title.trim(),
    topic: taskData.topic.trim(),
    status: taskData.status.trim(),
    description: taskData.description.trim(),
    date: taskData.date,
  };

  const response = await apiPut(API_ENDPOINTS.KANBAN_TASK_BY_ID(id), payload);
  return response.tasks || response.task || [];
}

export async function deleteTask(id) {
  const response = await apiDelete(API_ENDPOINTS.KANBAN_TASK_BY_ID(id));
  return response.tasks || id;
}
