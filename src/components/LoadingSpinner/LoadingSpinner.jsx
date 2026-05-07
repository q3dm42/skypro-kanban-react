import styled from "styled-components";
import { themeColors } from "../../utils/themeColors";

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  padding: 24px;
`;

const SkeletonBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
  width: 100%;
`;

const SkeletonColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SkeletonHeader = styled.div`
  width: 80%;
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(215, 223, 236, 0.9),
    rgba(255, 255, 255, 0.7),
    rgba(215, 223, 236, 0.9)
  );
  background-size: 200% 100%;
  animation: loading 1.6s infinite;
`;

const SkeletonCard = styled.div`
  min-height: 100px;
  border-radius: 16px;
  background: linear-gradient(
    90deg,
    rgba(215, 223, 236, 0.9),
    rgba(255, 255, 255, 0.7),
    rgba(215, 223, 236, 0.9)
  );
  background-size: 200% 100%;
  animation: loading 1.6s infinite;
`;

const LoadingText = styled.p`
  color: ${themeColors.textMuted};
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
`;

const LoadingSpinner = ({ text = "Загружаем данные..." }) => {
  const columns = [[120, 80], [100], [120, 90], [110], [100, 80]];

  return (
    <SpinnerContainer>
      <SkeletonBoard>
        {columns.map((cards, columnIndex) => (
          <SkeletonColumn key={columnIndex}>
            <SkeletonHeader
              style={{ width: columnIndex % 2 === 0 ? "70%" : "85%" }}
            />
            {cards.map((height, cardIndex) => (
              <SkeletonCard
                key={cardIndex}
                style={{ minHeight: `${height}px` }}
              />
            ))}
          </SkeletonColumn>
        ))}
      </SkeletonBoard>
      <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
