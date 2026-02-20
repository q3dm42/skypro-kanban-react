import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { themeColors } from "../utils/themeColors";

const Page = styled.main`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px 16px;
	background: radial-gradient(circle at top, #f0f4ff 0%, #e2e7f5 60%);
`;

const Card = styled.section`
	width: 100%;
	max-width: 520px;
	background-color: ${themeColors.bgLight};
	border-radius: 16px;
	padding: 40px 32px;
	box-shadow: 0 24px 60px rgba(26, 56, 101, 0.18);
	text-align: center;
`;

const Title = styled.h1`
	font-size: 32px;
	font-weight: 700;
	color: ${themeColors.textDark};
	margin-bottom: 12px;
`;

const Text = styled.p`
	color: ${themeColors.textMuted};
	margin-bottom: 24px;
`;

const BackLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 44px;
	padding: 0 20px;
	border-radius: 10px;
	background-color: ${themeColors.primary};
	color: ${themeColors.textLight};
	font-size: 14px;
	font-weight: 600;
`;

const NotFoundPage = () => {
	return (
		<Page>
			<Card>
				<Title>404</Title>
				<Text>Страница не найдена. Проверьте адрес или вернитесь назад.</Text>
				<BackLink to="/">Вернуться на главную</BackLink>
			</Card>
		</Page>
	);
};

export default NotFoundPage;
