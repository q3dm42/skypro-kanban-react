import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { themeColors } from "../utils/themeColors";

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

const RegisterPage = ({ onRegister }) => {
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		onRegister();
		navigate("/");
	};

	return (
		<Page>
			<Card>
				<Title>Регистрация</Title>
				<Subtitle>Создайте аккаунт, чтобы управлять задачами.</Subtitle>
				<form onSubmit={handleSubmit}>
					<Field>
						Имя
						<input type="text" name="name" placeholder="Введите имя" />
					</Field>
					<Field>
						Email
						<input type="email" name="email" placeholder="email@example.com" />
					</Field>
					<Field>
						Пароль
						<input type="password" name="password" placeholder="Создайте пароль" />
					</Field>
					<SubmitButton type="submit">Зарегистрироваться</SubmitButton>
				</form>
				<Hint>
					Уже есть аккаунт? <Link to="/login">Войти</Link>
				</Hint>
			</Card>
		</Page>
	);
};

export default RegisterPage;
