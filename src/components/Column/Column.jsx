import React from "react";

const Column = ({ title, cards }) => {
  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">{cards}</div>
    </div>
  );
};

export default Column;
