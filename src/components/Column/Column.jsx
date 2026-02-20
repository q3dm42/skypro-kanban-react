import React from "react";
import { ColumnWrapper, ColumnTitle, CardsWrapper } from "./Column.styled";

const Column = ({ title, cards }) => {
  return (
    <ColumnWrapper>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsWrapper>{cards}</CardsWrapper>
    </ColumnWrapper>
  );
};

export default Column;
