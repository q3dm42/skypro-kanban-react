import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Column from "../components/Column/Column";
import Card from "../components/Card/Card";
import { useTask } from "../context/TaskContext";
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

const topicToThemeClass = {
  "Web Design": "_orange",
  Research: "_green",
  Copywriting: "_purple",
};

const HomePage = () => {
  const { tasks, loading, error, fetchTasks } = useTask();

  useEffect(() => {
    if (tasks.length === 0) {
      if (!hasShownInitialLoader) {
        // Показываем лоадер хотя бы 2 секунды при первой загрузке
        const timer = setTimeout(() => {
          hasShownInitialLoader = true;
        }, 2000);
        fetchTasks();
        return () => clearTimeout(timer);
      } else {
        fetchTasks();
      }
    }
  }, [fetchTasks, tasks.length]);

  const renderCard = (card) => (
    <Card
      key={card._id}
      id={card._id}
      theme={card.topic}
      themeClass={topicToThemeClass[card.topic] || "_green"}
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
              ) : error ? (
                <Loading>
                  <p style={{ color: "#d32f2f" }}>Ошибка: {error}</p>
                </Loading>
              ) : (
                columns.map((column) => (
                  <Column
                    key={column}
                    title={column}
                    cards={tasks
                      .filter((card) => card && card.status === column)
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
