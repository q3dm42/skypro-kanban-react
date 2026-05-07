import styled from "styled-components";
import { themeColors } from "../../utils/themeColors";

const EmptyStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
  grid-column: 1 / -1;
`;

const EmptyStateText = styled.p`
  color: ${themeColors.textMuted};
  font-size: 18px;
  font-weight: 500;
`;

const EmptyState = ({ text = "Новых задач нет" }) => {
  return (
    <EmptyStateContainer>
      <EmptyStateText>{text}</EmptyStateText>
    </EmptyStateContainer>
  );
};

export default EmptyState;
