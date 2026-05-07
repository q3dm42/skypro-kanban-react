import styled from "styled-components";
import { themeColors } from "../../utils/themeColors";

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  flex-direction: column;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${themeColors.borderColor};
  border-top: 4px solid ${themeColors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: ${themeColors.textMuted};
  font-size: 16px;
  font-weight: 500;
`;

const LoadingSpinner = ({ text = "Загружаем данные..." }) => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
