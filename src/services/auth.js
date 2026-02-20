import { apiPost } from "./api";
import { API_ENDPOINTS } from "../config/api";

/**
 * Регистрация пользователя
 * @param {string} name - имя пользователя
 * @param {string} email - email
 * @param {string} password - пароль
 */
export async function register(name, email, password) {
	const response = await apiPost(API_ENDPOINTS.REGISTER, {
		name,
		email,
		password,
	});

	if (response.token) {
		localStorage.setItem("authToken", response.token);
		localStorage.setItem("user", JSON.stringify(response.user));
	}

	return response;
}

/**
 * Вход в систему
 * @param {string} email - email
 * @param {string} password - пароль
 */
export async function login(email, password) {
	const response = await apiPost(API_ENDPOINTS.LOGIN, {
		email,
		password,
	});

	if (response.token) {
		localStorage.setItem("authToken", response.token);
		localStorage.setItem("user", JSON.stringify(response.user));
	}

	return response;
}

/**
 * Выход из системы
 */
export function logout() {
	localStorage.removeItem("authToken");
	localStorage.removeItem("user");
}

/**
 * Получить текущего пользователя
 */
export function getCurrentUser() {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : null;
}

/**
 * Проверить, авторизован ли пользователь
 */
export function isAuthenticated() {
	return !!localStorage.getItem("authToken");
}
