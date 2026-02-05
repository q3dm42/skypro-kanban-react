import styled from "styled-components";

export const CardItem = styled.div`
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
`;

export const CardWrapper = styled.div`
  width: 220px;
  height: 130px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &._orange {
    background-color: #FFE4C2;
    color: #FF6D00;
  }

  &._green {
    background-color: #B4FDD1;
    color: #06B16E;
  }

  &._purple {
    background-color: #E9D4FF;
    color: #9A48F1;
  }

  &._gray {
    background: #94A6BE;
    color: #FFFFFF;
  }
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  margin: 0;
  line-height: 1.3;
  word-break: break-word;
  flex: 1;
`;

export const CardContent = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardDate = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #94A6BE;
  margin-top: auto;

  p {
    margin: 0;
  }
`;

export const CardBtn = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94A6BE;
  }
`;
