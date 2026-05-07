import { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { themeColors } from "../utils/themeColors";
import { register } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background: linear-gradient(135deg, #fff9f3 0%, #ffe7da 100%);
`;

const Card = styled.section`
  width: 100%;
  max-width: 440px;
  background-color: ${themeColors.bgLight};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 24px 60px rgba(26, 56, 101, 0.18);
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${themeColors.textDark};
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${themeColors.textMuted};
  margin-bottom: 24px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: ${themeColors.textMuted};
  margin-bottom: 16px;

  input {
    height: 44px;
    border-radius: 8px;
    border: 1px solid ${themeColors.borderColor};
    padding: 0 12px;
    font-size: 14px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 8px;
  background-color: ${themeColors.primary};
  color: ${themeColors.textLight};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${themeColors.primaryDark};
  }
`;

const Hint = styled.p`
  margin-top: 16px;
  font-size: 13px;
  color: ${themeColors.textMuted};
  text-align: center;

  a {
    color: ${themeColors.primary};
    font-weight: 600;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 13px;
  margin-top: -8px;
  margin-bottom: 12px;
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Введите имя";
    }

    if (!login.trim()) {
      nextErrors.login = "Введите логин";
    }

    if (!password.trim()) {
      nextErrors.password = "Введите пароль";
    } else if (password.length < 3) {
      nextErrors.password = "Пароль должен быть минимум 3 символа";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await register(name, login, password);
      handleLogin(response?.user);
      navigate("/");
    } catch (err) {
      if (err.status === 400 || err.status === 409) {
        setFieldErrors({
          login: "Пользователь с таким логином уже зарегистрирован",
        });
      } else {
        setError(err.message || "Ошибка регистрации. Проверьте данные.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Title>Регистрация</Title>
        <Subtitle>Создайте аккаунт, чтобы управлять задачами.</Subtitle>
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Field>
            Имя
            <input
              type="text"
              name="name"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </Field>
          {fieldErrors.name && (
            <ErrorMessage role="alert">{fieldErrors.name}</ErrorMessage>
          )}
          <Field>
            Логин
            <input
              type="text"
              name="login"
              placeholder="Введите логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              disabled={loading}
            />
          </Field>
          {fieldErrors.login && (
            <ErrorMessage role="alert">{fieldErrors.login}</ErrorMessage>
          )}
          <Field>
            Пароль
            <input
              type="password"
              name="password"
              placeholder="Создайте пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </Field>
          {fieldErrors.password && (
            <ErrorMessage role="alert">{fieldErrors.password}</ErrorMessage>
          )}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Регистрируемся..." : "Зарегистрироваться"}
          </SubmitButton>
        </form>
        <Hint>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </Hint>
      </Card>
    </Page>
  );
};

export default RegisterPage;
