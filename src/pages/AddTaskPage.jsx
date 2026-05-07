import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import TaskCalendar from "../components/TaskCalendar/TaskCalendar";
import { useTask } from "../context/TaskContext";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const { createTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Research");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const topics = [
    { id: 1, name: "Web Design", value: "Web Design", color: "_orange" },
    { id: 2, name: "Research", value: "Research", color: "_green" },
    { id: 3, name: "Copywriting", value: "Copywriting", color: "_purple" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const nextErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Введите название задачи";
    }

    if (!description.trim()) {
      nextErrors.description = "Введите описание задачи";
    }

    if (!topic.trim()) {
      nextErrors.topic = "Выберите категорию задачи";
    }

    const dateToSend = selectedDate
      ? selectedDate.toISOString()
      : new Date().toISOString();

    if (!dateToSend) {
      nextErrors.date = "Выберите дату задачи";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setLoading(true);

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        topic: topic,
        date: dateToSend,
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
              <h3 className="pop-new-card__ttl">Создание задачи</h3>
              {error && (
                <p
                  style={{
                    color: "#d32f2f",
                    fontSize: "14px",
                    marginBottom: "12px",
                    fontWeight: 500,
                  }}
                >
                  {error}
                </p>
              )}
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
                    {fieldErrors.title && (
                      <p
                        role="alert"
                        style={{
                          color: "#d32f2f",
                          fontSize: "13px",
                          marginTop: "6px",
                        }}
                      >
                        {fieldErrors.title}
                      </p>
                    )}
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
                    {fieldErrors.description && (
                      <p
                        role="alert"
                        style={{
                          color: "#d32f2f",
                          fontSize: "13px",
                          marginTop: "6px",
                        }}
                      >
                        {fieldErrors.description}
                      </p>
                    )}
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
                            opacity: loading ? 0.5 : undefined,
                          }}
                        >
                          <p className={t.color}>{t.name}</p>
                        </div>
                      ))}
                    </div>
                    {fieldErrors.topic && (
                      <p
                        role="alert"
                        style={{
                          color: "#d32f2f",
                          fontSize: "13px",
                          marginTop: "8px",
                        }}
                      >
                        {fieldErrors.topic}
                      </p>
                    )}
                  </div>
                </form>
                <div>
                  <TaskCalendar
                    selectedDate={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    withDeadlinePrefix={false}
                  />
                  {fieldErrors.date && (
                    <p
                      role="alert"
                      style={{
                        color: "#d32f2f",
                        fontSize: "13px",
                        marginTop: "8px",
                      }}
                    >
                      {fieldErrors.date}
                    </p>
                  )}
                </div>
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
