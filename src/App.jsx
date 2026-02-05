import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopBrowse from "./components/PopBrowse/PopBrowse";
import PopUser from "./components/PopUser/PopUser";
import Column from "./components/Column/Column";
import Card from "./components/Card/Card";
import data from "../data.js";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Имитация загрузки 2 секунды
    return () => clearTimeout(timer);
  }, []);

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
    <>
      <div className="wrapper">
        {/* pop-up start*/}

        <PopUser />

        <PopNewCard />

        <PopBrowse />

        {/* pop-up end*/}

        <Header />
        <main className="main">
          <div className="container">
            <div className="main__block">
              <div className="main__content">
                {loading ? (
                  <div className="loading">
                    <p>Данные загружаются</p>
                  </div>
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
