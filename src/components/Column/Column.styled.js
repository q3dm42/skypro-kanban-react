import styled from "styled-components";

export const ColumnWrapper = styled.div`
  width: 20%;
  margin: 0 auto;
  display: block;

  @media (max-width: 1200px) {
    width: 25%;
  }

  @media (max-width: 660px) {
    width: 100%;
  }

  @media (max-width: 495px) {
    width: 100%;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  p {
    color: #94a6be;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
  }
`;

export const CardsWrapper = styled.div`
  width: 100%;
  display: block;
  position: relative;
  min-height: 160px;
  border-radius: 8px;
`;

export const DropPlaceholder = styled.div`
  width: 220px;
  height: 130px;
  margin: 5px;
  border-radius: 10px;
  background-image: url("data:image/svg+xml,%3csvg width='220' height='130' viewBox='0 0 220 130' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='0.5' y='0.5' width='219' height='129' rx='9.5' stroke='%2394A6BE' stroke-width='1' stroke-dasharray='6 4'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(-4px)"};
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    filter 0.18s ease;
  pointer-events: none;

  ${({ $active }) =>
    $active &&
    `
      filter: drop-shadow(0 0 0.5px #565EEF);
    `}

  @media (max-width: 660px) {
    width: calc(100% - 10px);
  }
`;
