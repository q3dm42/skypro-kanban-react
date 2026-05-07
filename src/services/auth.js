import { apiPost } from "./api";
import { API_ENDPOINTS } from "../config/api";

export async function register(name, login, password) {
  const response = await apiPost(API_ENDPOINTS.REGISTER, {
    name,
    login,
    password,
  });

  if (response.user && response.user.token) {
    localStorage.setItem("authToken", response.user.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  }

  return response;
}

export async function login(login, password) {
  const response = await apiPost(API_ENDPOINTS.LOGIN, {
    login,
    password,
  });

  if (response.user && response.user.token) {
    localStorage.setItem("authToken", response.user.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  }

  return response;
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}
