import React from "react";
import {
  PopExitWrapper,
  PopExitContainer,
  PopExitBlock,
  PopExitTitle,
  PopExitForm,
  PopExitBtnYes,
  PopExitBtnNo,
} from "./PopUser.styled";

const PopUser = ({ isModalVisible }) => {
  return (
    <PopExitWrapper id="popExit" className={isModalVisible ? "active" : ""}>
      <PopExitContainer>
        <PopExitBlock>
          <PopExitTitle>Выйти из аккаунта?</PopExitTitle>
          <PopExitForm id="formExit">
            <PopExitBtnYes id="exitYes">
              <a href="modal/signin.html">Да, выйти</a>
            </PopExitBtnYes>
            <PopExitBtnNo id="exitNo">
              <a href="main.html">Нет, остаться</a>
            </PopExitBtnNo>
          </PopExitForm>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitWrapper>
  );
};

export default PopUser;
