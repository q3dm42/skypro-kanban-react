import styled from "styled-components";
import { themeColors } from "../../utils/themeColors";

export const HeaderWrapper = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${themeColors.bgLight};
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 10px;
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media screen and (max-width: 495px) {
    padding: 0 16px;
  }
`;

export const HeaderLogo = styled.div`
  img {
    width: 85px;
  }

  &._dark {
    display: none;
  }

  &._show {
    display: block;
  }
`;

export const HeaderNav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderBtnNew = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${themeColors.primary};
  color: ${themeColors.textLight};
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;

  a {
    color: ${themeColors.textLight};
  }

  &:hover {
    background-color: ${themeColors.primaryDark};
  }

  @media screen and (max-width: 495px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
  }
`;

export const HeaderUser = styled.a`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${themeColors.primary};
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid ${themeColors.primary};
    border-bottom: 1.9px solid ${themeColors.primary};
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }

  &:hover {
    color: ${themeColors.primaryDark};

    &::after {
      border-left-color: ${themeColors.primaryDark};
      border-bottom-color: ${themeColors.primaryDark};
    }
  }
`;

export const PopUserSet = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid ${themeColors.borderMuted};
  background: ${themeColors.bgLight};
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
  display: none;

  &.active {
    display: block;
  }

  @media screen and (max-width: 495px) {
    width: 100vw;
    height: auto;
    border-radius: 0;
    left: 0;
    right: 0;
    top: 70px;
    padding: 20px 16px;
  }
`;

export const PopUserSetName = styled.p`
  color: ${themeColors.textDark};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const PopUserSetMail = styled.p`
  color: ${themeColors.textMuted};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const PopUserSetTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    color: ${themeColors.textDark};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }

  input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 13px;
    border-radius: 100px;
    background: ${themeColors.bgSecondary};
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${themeColors.textMuted};
    transition: 0.5s;
  }

  input:checked[type="checkbox"]::before {
    left: 12px;
  }
`;

export const PopUserSetBtn = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: ${themeColors.primary};
  border-radius: 4px;
  border: 1px solid ${themeColors.primary};
  cursor: pointer;

  a {
    color: ${themeColors.primary};
  }

  &:hover {
    background-color: ${themeColors.primaryDark};
    color: ${themeColors.textLight};
    border-color: ${themeColors.primaryDark};

    a {
      color: ${themeColors.textLight};
    }
  }
`;
