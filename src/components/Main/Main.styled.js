import styled from "styled-components";
import { themeColors } from "../../utils/themeColors";

export const AppWrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #EAEEF6;
`;

export const MainWrapper = styled.div`
  width: 100%;
  background-color: #EAEEF6;
`;

export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media (max-width: 660px) {
    padding: 0 15px;
  }

  @media (max-width: 495px) {
    padding: 0 10px;
  }
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;
  gap: 0;

  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

  @media (max-width: 495px) {
    flex-direction: column;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 40px;
  color: ${themeColors.textMuted};
  font-size: 16px;

  @media (max-width: 495px) {
    padding: 20px;
  }
`;
