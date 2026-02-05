import React, { useState } from "react";
import {
  HeaderWrapper,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderBtnNew,
  HeaderUser,
  PopUserSet,
  PopUserSetName,
  PopUserSetMail,
  PopUserSetTheme,
  PopUserSetBtn,
} from "./Header.styled";

const Header = () => {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const toggleUserModal = () => {
    setIsUserModalVisible(!isUserModalVisible);
  };

  return (
    <HeaderWrapper>
      <HeaderBlock>
        <HeaderLogo className="_show _light">
          <a href="" target="_self">
            <img src="/images/logo.png" alt="logo" />
          </a>
        </HeaderLogo>
        <HeaderLogo className="_dark">
          <a href="" target="_self">
            <img src="/images/logo_dark.png" alt="logo" />
          </a>
        </HeaderLogo>
        <HeaderNav>
          <HeaderBtnNew id="btnMainNew">
            <a href="#popNewCard">Создать новую задачу</a>
          </HeaderBtnNew>
          <HeaderUser
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleUserModal();
            }}
          >
            Ivan Ivanov
          </HeaderUser>
          <PopUserSet className={isUserModalVisible ? "active" : ""}>
            <PopUserSetName>Ivan Ivanov</PopUserSetName>
            <PopUserSetMail>ivan.ivanov@gmail.com</PopUserSetMail>
            <PopUserSetTheme>
              <p>Темная тема</p>
              <input type="checkbox" name="checkbox" />
            </PopUserSetTheme>
            <PopUserSetBtn type="button">
              <a href="#popExit">Выйти</a>
            </PopUserSetBtn>
          </PopUserSet>
        </HeaderNav>
      </HeaderBlock>
    </HeaderWrapper>
  );
};

export default Header;
