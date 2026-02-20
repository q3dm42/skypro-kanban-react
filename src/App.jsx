import { useState, useEffect } from "react";
import "./App.css";
import { GlobalStyle } from "./utils/GlobalStyle";
import {
  AppWrapper,
  MainWrapper,
  Container,
  MainBlock,
  MainContent,
  Loading,
} from "./components/Main/Main.styled";
import Header from "./components/Header/Header";
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopBrowse from "./components/PopBrowse/PopBrowse";
import PopUser from "./components/PopUser/PopUser";
import Column from "./components/Column/Column";
import Card from "./components/Card/Card";
import data from "../data.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [isPopExitVisible, setIsPopExitVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleExitClick = (e) => {
    e.preventDefault();
    setIsPopExitVisible(true);
  };

  const columns = [
    "Без статуса",
    "Нужен ревью",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const renderCard = (card) => (
    <Card
      key={card.id}
      theme={card.topic}
      themeClass={card.themeClass}
      title={card.title}
      date={card.date}
    />
  );

  return (
    <AppWrapper>
      <GlobalStyle />
      <PopUser isModalVisible={isPopExitVisible} />
      <PopNewCard />
      <PopBrowse />
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
}

export default App;
