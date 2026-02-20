import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Column from "../components/Column/Column";
import Card from "../components/Card/Card";
import data from "../../data.js";
import {
  AppWrapper,
  MainWrapper,
  Container,
  MainBlock,
  MainContent,
  Loading,
} from "../components/Main/Main.styled";

const columns = [
  "Без статуса",
  "Нужен ревью",
  "В работе",
  "Тестирование",
  "Готово",
];

let hasShownInitialLoader = false;

const HomePage = () => {
  const [loading, setLoading] = useState(!hasShownInitialLoader);

  useEffect(() => {
    if (hasShownInitialLoader) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      hasShownInitialLoader = true;
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderCard = (card) => (
    <Card
      key={card.id}
      id={card.id}
      theme={card.topic}
      themeClass={card.themeClass}
      title={card.title}
      date={card.date}
    />
  );

  return (
    <AppWrapper>
      <Header />
      <MainWrapper>
        <Container>
          <MainBlock>
            <MainContent>
              {loading ? (
                <Loading>
                  <p>Данные загружаются</p>
                </Loading>
              ) : (
                columns.map((column) => (
                  <Column
                    key={column}
                    title={column}
                    cards={data
                      .filter((card) => card.status === column)
                      .map(renderCard)}
                  />
                ))
              )}
            </MainContent>
          </MainBlock>
        </Container>
      </MainWrapper>
    </AppWrapper>
  );
};

export default HomePage;
