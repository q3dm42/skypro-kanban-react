import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { parseISO } from "date-fns";
import HomePage from "./HomePage";
import TaskCalendar from "../components/TaskCalendar/TaskCalendar";
import { getTaskById } from "../services/kanban";
import { useTask } from "../context/TaskContext";

const statuses = [
  "Без статуса",
  "Нужен ревью",
  "В работе",
  "Тестирование",
  "Готово",
];

const topicColors = {
  "Web Design": "_orange",
  Research: "_green",
  Copywriting: "_purple",
};

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTask, deleteTask } = useTask();

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Без статуса");
  const [topic, setTopic] = useState("Research");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

        // Парсим дату (API возвращает ISO формат)
        if (fetchedTask.date) {
          try {
            const parsedDate = parseISO(fetchedTask.date);
            setSelectedDate(parsedDate);
          } catch {
            // Если не удалось спарсить, оставляем null
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
    setError("");

    if (!title.trim()) {
      setError("Название задачи не должно быть пусто");
      return;
    }

    if (!description.trim()) {
      setError("Описание задачи не должно быть пусто");
      return;
    }

    if (!topic.trim()) {
      setError("Категория задачи не должна быть пустой");
      return;
    }

    if (!status.trim()) {
      setError("Статус задачи не должен быть пустым");
      return;
    }

    const dateToSend = selectedDate
      ? selectedDate.toISOString()
      : task?.date || "";

    if (!dateToSend) {
      setError("Дата задачи не должна быть пустой");
      return;
    }

    setSaving(true);

    try {
      const updatedData = {
        title: title.trim(),
        description: description.trim(),
        status: status,
        topic: topic,
        date: dateToSend,
      };

      await updateTask(id, updatedData);
      setIsEditing(false);
      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка сохранения");
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Сбросить изменения к исходным
    setTitle(task.title || "");
    setDescription(task.description || "");
    setStatus(task.status || "Без статуса");
    setTopic(task.topic || "Research");
    if (task.date) {
      try {
        const parsedDate = parseISO(task.date);
        setSelectedDate(parsedDate);
      } catch {
        setSelectedDate(null);
      }
    }
    setIsEditing(false);
    setError("");
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
              <div
                className="pop-browse__content"
                style={{ textAlign: "center", padding: "40px" }}
              >
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
              <div
                className="pop-browse__content"
                style={{ textAlign: "center", padding: "40px" }}
              >
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
                {isEditing ? (
                  <input
                    type="text"
                    className="pop-browse__ttl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название задачи"
                    disabled={saving}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                ) : (
                  <h3 className="pop-browse__ttl">{task.title}</h3>
                )}
                <div className="card__theme">
                  <p
                    className={`${topicColors[topic] || "_green"} _active-category`}
                  >
                    {topic}
                  </p>
                </div>
              </div>
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

              <div className="pop-browse__status status">
                <p className="status__p subttl">Статус</p>
                <div className="status__themes">
                  {statuses.map((statusName) => (
                    <div
                      key={statusName}
                      className={`status__theme ${
                        status === statusName ? "_active" : ""
                      }`}
                      onClick={
                        isEditing ? () => setStatus(statusName) : undefined
                      }
                      style={{
                        cursor: isEditing && !saving ? "pointer" : "default",
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
                    {isEditing ? (
                      <textarea
                        className="form-browse__area"
                        name="text"
                        id="textArea01"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите описание задачи..."
                        disabled={saving}
                      ></textarea>
                    ) : (
                      <p
                        className="form-browse__area"
                        style={{
                          whiteSpace: "pre-wrap",
                          border: "none",
                          padding: "8px",
                          background: "transparent",
                        }}
                      >
                        {description || "Описание отсутствует"}
                      </p>
                    )}
                  </div>
                </form>
                {isEditing && (
                  <TaskCalendar
                    selectedDate={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                )}
              </div>

              <div className="pop-browse__btn-edit">
                {isEditing ? (
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
                      onClick={handleCancel}
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
                ) : (
                  <div className="btn-group">
                    <button
                      className="btn-edit__edit _btn-bg _hover01"
                      type="button"
                      onClick={handleEdit}
                    >
                      Редактировать
                    </button>
                  </div>
                )}
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
