export const API_BASE_URL = "https://wedev-api.sky.pro/api";

export const API_ENDPOINTS = {
  KANBAN_TASKS: "/kanban",
  KANBAN_TASK_BY_ID: (id) => `/kanban/${id}`,
  LOGIN: "/user/login",
  REGISTER: "/user",
};
