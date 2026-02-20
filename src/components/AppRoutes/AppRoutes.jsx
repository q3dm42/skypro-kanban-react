import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../../utils/GlobalStyle";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import AddTaskPage from "../../pages/AddTaskPage";
import CardPage from "../../pages/CardPage";
import ExitPage from "../../pages/ExitPage";
import NotFoundPage from "../../pages/NotFoundPage";

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = () => setIsAuth(true);
  const handleLogout = () => setIsAuth(false);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<RegisterPage onRegister={handleLogin} />}
        />
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/card/new" element={<AddTaskPage />} />
          <Route path="/card/:id" element={<CardPage />} />
          <Route path="/exit" element={<ExitPage onLogout={handleLogout} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
