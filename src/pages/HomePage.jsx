import { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import Column from "../components/Column/Column";
import Card from "../components/Card/Card";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import EmptyState from "../components/EmptyState/EmptyState";
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
  const { tasks, loading, error, fetchTasks, updateTask } = useTask();
  const dragDepthByStatus = useRef({});
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState("");
  const [dragError, setDragError] = useState("");

  useEffect(() => {
    if (tasks.length === 0) {
      if (!hasShownInitialLoader) {
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

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", taskId);
    setDraggedTaskId(taskId);
    setDragError("");
  };

  const handleDragEnd = () => {
    dragDepthByStatus.current = {};
    setDraggedTaskId(null);
    setDragOverStatus("");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (event, statusName) => {
    event.preventDefault();
    dragDepthByStatus.current[statusName] =
      (dragDepthByStatus.current[statusName] || 0) + 1;
    setDragOverStatus(statusName);
  };

  const handleDragLeave = (event, statusName) => {
    event.preventDefault();
    dragDepthByStatus.current[statusName] =
      (dragDepthByStatus.current[statusName] || 0) - 1;

    if (dragDepthByStatus.current[statusName] <= 0) {
      delete dragDepthByStatus.current[statusName];
      setDragOverStatus((currentStatus) =>
        currentStatus === statusName ? "" : currentStatus,
      );
    }
  };

  const handleDrop = async (event, nextStatus) => {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("text/plain") || draggedTaskId;
    const task = tasks.find((currentTask) => currentTask?._id === taskId);

    dragDepthByStatus.current = {};
    setDraggedTaskId(null);
    setDragOverStatus("");

    if (!task || task.status === nextStatus) {
      return;
    }

    setDragError("");

    try {
      await updateTask(taskId, {
        title: task.title,
        description: task.description,
        topic: task.topic,
        date: task.date,
        status: nextStatus,
      });
    } catch (err) {
      setDragError(err.message || "Не удалось переместить задачу");
      fetchTasks();
    }
  };

  const renderCard = (card) => (
    <Card
      key={card._id}
      id={card._id}
      theme={card.topic}
      themeClass={topicToThemeClass[card.topic] || "_green"}
      title={card.title}
      date={card.date}
      draggable
      isDragging={draggedTaskId === card._id}
      onDragStart={(event) => handleDragStart(event, card._id)}
      onDragEnd={handleDragEnd}
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
                <LoadingSpinner text="Загружаем задачи..." />
              ) : error ? (
                <Loading>
                  <p style={{ color: "#d32f2f" }}>Ошибка: {error}</p>
                </Loading>
              ) : dragError ? (
                <>
                  <Loading>
                    <p style={{ color: "#d32f2f" }}>{dragError}</p>
                  </Loading>
                  {columns.map((column) => {
                    const columnCards = tasks
                      .filter((card) => card && card.status === column)
                      .map(renderCard);

                    return (
                      <Column
                        key={column}
                        title={column}
                        cards={columnCards}
                        isDragging={Boolean(draggedTaskId)}
                        isDragOver={dragOverStatus === column}
                        onDragOver={handleDragOver}
                        onDragEnter={(event) =>
                          handleDragEnter(event, column)
                        }
                        onDragLeave={(event) =>
                          handleDragLeave(event, column)
                        }
                        onDrop={(event) => handleDrop(event, column)}
                      />
                    );
                  })}
                </>
              ) : tasks.length === 0 ? (
                <EmptyState text="Новых задач нет" />
              ) : (
                columns.map((column) => {
                  const columnCards = tasks
                    .filter((card) => card && card.status === column)
                    .map(renderCard);

                  return (
                    <Column
                      key={column}
                      title={column}
                      cards={columnCards}
                      isDragging={Boolean(draggedTaskId)}
                      isDragOver={dragOverStatus === column}
                      onDragOver={handleDragOver}
                      onDragEnter={(event) => handleDragEnter(event, column)}
                      onDragLeave={(event) => handleDragLeave(event, column)}
                      onDrop={(event) => handleDrop(event, column)}
                    />
                  );
                })
              )}
            </MainContent>
          </MainBlock>
        </Container>
      </MainWrapper>
    </AppWrapper>
  );
};

export default HomePage;
