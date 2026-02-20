export const API_BASE_URL = "https://wedev-api.sky.pro/api";

export const API_ENDPOINTS = {
	// Kanban tasks
	KANBAN_TASKS: "/kanban",
	KANBAN_TASK_BY_ID: (id) => `/kanban/${id}`,

	// Auth
	LOGIN: "/auth/login",
	REGISTER: "/auth/register",
};
