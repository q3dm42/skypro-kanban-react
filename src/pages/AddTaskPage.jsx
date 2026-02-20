import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import TaskCalendar from "../components/TaskCalendar/TaskCalendar";
import { createTask } from "../services/kanban";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Research");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const topics = [
    { id: 1, name: "Web Design", value: "Web Design", color: "_orange" },
    { id: 2, name: "Research", value: "Research", color: "_green" },
    { id: 3, name: "Copywriting", value: "Copywriting", color: "_purple" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Валидация
    if (!title.trim()) {
      setError("Название задачи не должно быть пусто");
      setLoading(false);
      return;
    }

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        topic: topic,
        date: selectedDate
          ? selectedDate.toISOString()
          : new Date().toISOString(),
        status: "Без статуса",
      };

      await createTask(taskData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка создания задачи");
      setLoading(false);
    }
  };

  const closeModal = () => {
    navigate("/");
  };

  return (
    <>
      <HomePage />
      <div className="pop-new-card" style={{ display: "block" }}>
        <div className="pop-new-card__container">
          <div className="pop-new-card__block">
            <div className="pop-new-card__content">
              <h3 className="pop-new-card__ttl">
                {error ? (
                  <span style={{ color: "#d32f2f" }}>{error}</span>
                ) : (
                  "Создание задачи"
                )}
              </h3>
              <div className="pop-new-card__wrap">
                <form
                  className="pop-new-card__form form-new"
                  onSubmit={handleSubmit}
                >
                  <div className="form-new__block">
                    <label htmlFor="formTitle" className="subttl">
                      Название задачи
                    </label>
                    <input
                      className="form-new__input"
                      type="text"
                      name="name"
                      id="formTitle"
                      placeholder="Введите название задачи..."
                      autoFocus
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-new__block">
                    <label htmlFor="textArea" className="subttl">
                      Описание задачи
                    </label>
                    <textarea
                      className="form-new__area"
                      name="text"
                      id="textArea"
                      placeholder="Введите описание задачи..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={loading}
                    ></textarea>
                  </div>
                  <div className="pop-new-card__categories categories">
                    <p className="categories__p subttl">Категория</p>
                    <div className="categories__themes">
                      {topics.map((t) => (
                        <div
                          key={t.id}
                          className={`categories__theme ${t.color} ${topic === t.value ? "_active-category" : ""}`}
                          onClick={() => setTopic(t.value)}
                          style={{
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.5 : 1,
                          }}
                        >
                          <p className={t.color}>{t.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
                <TaskCalendar
                  selectedDate={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  withDeadlinePrefix={false}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <button
                  type="button"
                  className="form-new__create _hover01"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Создаём..." : "Создать задачу"}
                </button>
                <button
                  type="button"
                  className="_btn-bor _hover03"
                  onClick={closeModal}
                  style={{ padding: "0 14px", opacity: loading ? 0.5 : 1 }}
                  disabled={loading}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskPage;
