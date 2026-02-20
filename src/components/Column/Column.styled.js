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
`;
