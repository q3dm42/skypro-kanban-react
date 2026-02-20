import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </HeaderLogo>
        <HeaderLogo className="_dark">
          <Link to="/">
            <img src="/images/logo_dark.png" alt="logo" />
          </Link>
        </HeaderLogo>
        <HeaderNav>
          <HeaderBtnNew id="btnMainNew">
            <Link to="/card/new">Создать новую задачу</Link>
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
              <Link to="/exit">Выйти</Link>
            </PopUserSetBtn>
          </PopUserSet>
        </HeaderNav>
      </HeaderBlock>
    </HeaderWrapper>
  );
};

export default Header;
