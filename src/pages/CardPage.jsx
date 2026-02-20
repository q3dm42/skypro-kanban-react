import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isValid, parse } from "date-fns";
import HomePage from "./HomePage";
import TaskCalendar from "../components/TaskCalendar/TaskCalendar";
import { getTaskById, updateTask, deleteTask } from "../services/kanban";

const statuses = [
  "Без статуса",
  "Нужен ревью",
  "В работе",
  "Тестирование",
  "Готово",
];

const topicColors = {
  "Web Design": "_orange",
  "Research": "_green",
  "Copywriting": "_purple",
};

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Без статуса");
  const [topic, setTopic] = useState("Research");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Загрузка данных задачи
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTaskById(id);
        setTask(fetchedTask);
        setTitle(fetchedTask.title || "");
        setDescription(fetchedTask.description || "");
        setStatus(fetchedTask.status || "Без статуса");
        setTopic(fetchedTask.topic || "Research");
        
        // Парсим дату
        if (fetchedTask.date) {
          const parsedDate = parse(fetchedTask.date, "dd.MM.yy", new Date());
          if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
          }
        }
      } catch (err) {
        setError(err.message || "Ошибка загрузки задачи");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const updatedData = {
        title: title.trim() || "Задача",
        description: description.trim(),
        status: status,
        topic: topic,
        date: selectedDate ? selectedDate.toISOString().split("T")[0] : task.date,
      };

      await updateTask(id, updatedData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка сохранения");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
      setSaving(true);
      setError("");

      try {
        await deleteTask(id);
        navigate("/");
      } catch (err) {
        setError(err.message || "Ошибка удаления");
        setSaving(false);
      }
    }
  };

  const closeModal = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <>
        <HomePage />
        <div className="pop-browse" style={{ display: "block" }}>
          <div className="pop-browse__container">
            <div className="pop-browse__block">
              <div className="pop-browse__content" style={{ textAlign: "center", padding: "40px" }}>
                <p>Загрузка задачи...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!task) {
    return (
      <>
        <HomePage />
        <div className="pop-browse" style={{ display: "block" }}>
          <div className="pop-browse__container">
            <div className="pop-browse__block">
              <div className="pop-browse__content" style={{ textAlign: "center", padding: "40px" }}>
                <p style={{ color: "#d32f2f" }}>Задача не найдена</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HomePage />
      <div className="pop-browse" style={{ display: "block" }}>
        <div className="pop-browse__container">
          <div className="pop-browse__block">
            <div className="pop-browse__content">
              <div className="pop-browse__top-block">
                <h3 className="pop-browse__ttl">
                  {error ? <span style={{ color: "#d32f2f" }}>{error}</span> : task.title}
                </h3>
                <div className="card__theme">
                  <p className={`${topicColors[topic] || "_green"} _active-category`}>
                    {topic}
                  </p>
                </div>
              </div>

              <div className="pop-browse__status status">
                <p className="status__p subttl">Статус</p>
                <div className="status__themes">
                  {statuses.map((statusName) => (
                    <div
                      key={statusName}
                      className={`status__theme ${
                        status === statusName ? "_active" : ""
                      }`}
                      onClick={() => setStatus(statusName)}
                      style={{
                        cursor: saving ? "not-allowed" : "pointer",
                        opacity: saving ? 0.5 : 1,
                      }}
                    >
                      <p>{statusName}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pop-browse__wrap">
                <form className="pop-browse__form form-browse">
                  <div className="form-browse__block">
                    <label htmlFor="textArea01" className="subttl">
                      Описание задачи
                    </label>
                    <textarea
                      className="form-browse__area"
                      name="text"
                      id="textArea01"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Введите описание задачи..."
                      disabled={saving}
                    ></textarea>
                  </div>
                </form>
                <TaskCalendar
                  selectedDate={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                />
              </div>

              <div className="pop-browse__btn-edit">
                <div className="btn-group">
                  <button
                    className="btn-edit__edit _btn-bg _hover01"
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Сохраняем..." : "Сохранить"}
                  </button>
                  <button
                    className="btn-edit__edit _btn-bor _hover03"
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                  >
                    Отменить
                  </button>
                  <button
                    className="btn-edit__delete _btn-bor _hover03"
                    type="button"
                    onClick={handleDelete}
                    disabled={saving}
                  >
                    {saving ? "Удаляем..." : "Удалить задачу"}
                  </button>
                </div>
                <button
                  className="btn-edit__close _btn-bg _hover01"
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
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

export default CardPage;
