import {
  ColumnWrapper,
  ColumnTitle,
  CardsWrapper,
  DropPlaceholder,
} from "./Column.styled";

const Column = ({
  title,
  cards,
  isDragging = false,
  isDragOver = false,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
}) => {
  return (
    <ColumnWrapper
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsWrapper>
        {cards}
        {isDragging && (
          <DropPlaceholder $visible={isDragging} $active={isDragOver} />
        )}
      </CardsWrapper>
    </ColumnWrapper>
  );
};

export default Column;
