import React from "react";
import { useNavigate } from "react-router-dom";
import {
	PopExitWrapper,
	PopExitContainer,
	PopExitBlock,
	PopExitTitle,
	PopExitForm,
	PopExitBtnYes,
	PopExitBtnNo,
} from "../components/PopUser/PopUser.styled";
import { logout } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const ExitPage = () => {
	const navigate = useNavigate();
	const { handleLogout } = useAuth();

	const handleConfirm = () => {
		logout();
		handleLogout();
		navigate("/login");
	};

	const handleCancel = () => {
		navigate("/");
	};

	return (
		<PopExitWrapper className="active">
			<PopExitContainer>
				<PopExitBlock>
					<PopExitTitle>Выйти из аккаунта?</PopExitTitle>
					<PopExitForm>
						<PopExitBtnYes type="button" onClick={handleConfirm}>
							Да, выйти
						</PopExitBtnYes>
						<PopExitBtnNo type="button" onClick={handleCancel}>
							Нет, остаться
						</PopExitBtnNo>
					</PopExitForm>
				</PopExitBlock>
			</PopExitContainer>
		</PopExitWrapper>
	);
};

export default ExitPage;
