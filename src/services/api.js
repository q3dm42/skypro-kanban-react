import { API_BASE_URL } from "../config/api";

class APIError extends Error {
	constructor(status, message, details = null) {
		super(message);
		this.status = status;
		this.details = details;
		this.name = "APIError";
	}
}

/**
 * Базовый метод для API запросов с обработкой ошибок
 */
async function apiRequest(endpoint, options = {}) {
	const url = `${API_BASE_URL}${endpoint}`;
	const token = localStorage.getItem("authToken");

	const headers = {
		...options.headers,
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	try {
		const response = await fetch(url, {
			...options,
			headers,
		});

		const data = await response.json().catch(() => null);

		if (!response.ok) {
			throw new APIError(
				response.status,
				data?.error || `HTTP ${response.status}`,
				data
			);
		}

		return data;
	} catch (error) {
		if (error instanceof APIError) {
			throw error;
		}

		// Network error
		throw new APIError(
			0,
			"Ошибка сети. Проверьте подключение к интернету.",
			error.message
		);
	}
}

/**
 * GET запрос
 */
export function apiGet(endpoint) {
	return apiRequest(endpoint, {
		method: "GET",
	});
}

/**
 * POST запрос
 */
export function apiPost(endpoint, data) {
	return apiRequest(endpoint, {
		method: "POST",
		body: JSON.stringify(data),
	});
}

/**
 * PUT запрос
 */
export function apiPut(endpoint, data) {
	return apiRequest(endpoint, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}

/**
 * DELETE запрос
 */
export function apiDelete(endpoint) {
	return apiRequest(endpoint, {
		method: "DELETE",
	});
}

export { APIError };
