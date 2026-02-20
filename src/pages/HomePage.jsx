import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Column from "../components/Column/Column";
import Card from "../components/Card/Card";
import { getTasks } from "../services/kanban";
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
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(!hasShownInitialLoader);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError(err.message || "Ошибка загрузки задач");
      } finally {
        if (!hasShownInitialLoader) {
          hasShownInitialLoader = true;
        }
        setLoading(false);
      }
    };

    if (!hasShownInitialLoader) {
      // Показываем лоадер хотя бы 2 секунды при первой загрузке
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      fetchTasks();
      return () => clearTimeout(timer);
    } else {
      fetchTasks();
    }
  }, []);

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
