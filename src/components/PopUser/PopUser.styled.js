import styled from "styled-components";
import { themeColors } from "../../utils/themeColors";

export const PopExitWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 5;

  &.active {
    display: flex;
  }

  @media (max-width: 495px) {
    padding: 15px;
  }
`;

export const PopExitContainer = styled.div`
  background-color: ${themeColors.bgLight};
  border-radius: 5px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 495px) {
    padding: 20px;
  }
`;

export const PopExitBlock = styled.div`
  margin-bottom: 20px;
`;

export const PopExitTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${themeColors.textDark};
  margin-bottom: 15px;

  @media (max-width: 495px) {
    font-size: 18px;
  }
`;

export const PopExitForm = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 495px) {
    flex-direction: column;
  }
`;

export const PopExitBtnYes = styled.button`
  flex: 1;
  padding: 10px 20px;
  background-color: ${themeColors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${themeColors.primaryDark};
  }

  a {
    color: white;
    text-decoration: none;
  }

  @media (max-width: 495px) {
    width: 100%;
  }
`;

export const PopExitBtnNo = styled.button`
  flex: 1;
  padding: 10px 20px;
  background-color: ${themeColors.borderColor};
  color: ${themeColors.textDark};
  border: 1px solid ${themeColors.borderColor};
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${themeColors.borderMuted};
  }

  @media (max-width: 495px) {
    width: 100%;
  }
`;
