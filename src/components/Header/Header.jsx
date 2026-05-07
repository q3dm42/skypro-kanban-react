import { useState } from "react";
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
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const { user } = useAuth();

  const userName = user?.name || user?.login || "Пользователь";
  const userLogin = user?.login || "—";

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
          <HeaderBtnNew id="btnMainNew" to="/card/new">
            Создать новую задачу
          </HeaderBtnNew>
          <HeaderUser
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleUserModal();
            }}
          >
            {userName}
          </HeaderUser>
          <PopUserSet className={isUserModalVisible ? "active" : ""}>
            <PopUserSetName>{userName}</PopUserSetName>
            <PopUserSetMail>{userLogin}</PopUserSetMail>
            <PopUserSetTheme>
              <p>Темная тема</p>
              <input type="checkbox" name="checkbox" />
            </PopUserSetTheme>
            <PopUserSetBtn to="/exit">Выйти</PopUserSetBtn>
          </PopUserSet>
        </HeaderNav>
      </HeaderBlock>
    </HeaderWrapper>
  );
};

export default Header;
