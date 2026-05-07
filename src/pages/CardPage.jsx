import { useEffect, useState } from "react";
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

const topics = ["Web Design", "Research", "Copywriting"];

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTaskById(id);
        setTask(fetchedTask);
        setTitle(fetchedTask.title || "");
        setDescription(fetchedTask.description || "");
        setStatus(fetchedTask.status || "Без статуса");
        setTopic(fetchedTask.topic || "Research");

        if (fetchedTask.date) {
          try {
            const parsedDate = parseISO(fetchedTask.date);
            setSelectedDate(parsedDate);
          } catch {
            setSelectedDate(null);
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

    if (!status.trim()) {
      nextErrors.status = "Выберите статус задачи";
    }

    const dateToSend = selectedDate
      ? selectedDate.toISOString()
      : task?.date || "";

    if (!dateToSend) {
      nextErrors.date = "Выберите дату задачи";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
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
    setFieldErrors({});
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "300px",
                }}
              >
                <p style={{ color: "#94a6be", fontSize: "14px" }}>
                  Загружаем задачу...
                </p>
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
              {fieldErrors.title && (
                <p
                  role="alert"
                  style={{
                    color: "#d32f2f",
                    fontSize: "13px",
                    marginBottom: "12px",
                  }}
                >
                  {fieldErrors.title}
                </p>
              )}
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
                  {isEditing ? (
                    statuses.map((statusName) => (
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
                    ))
                  ) : (
                    <div className="status__theme _active">
                      <p>{status}</p>
                    </div>
                  )}
                </div>
                {fieldErrors.status && (
                  <p
                    role="alert"
                    style={{
                      color: "#d32f2f",
                      fontSize: "13px",
                      marginTop: "8px",
                    }}
                  >
                    {fieldErrors.status}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="pop-new-card__categories categories">
                  <p className="categories__p subttl">Категория</p>
                  <div className="categories__themes">
                    {topics.map((topicName) => (
                      <div
                        key={topicName}
                        className={`categories__theme ${topicColors[topicName]} ${
                          topic === topicName ? "_active-category" : ""
                        }`}
                        onClick={
                          saving ? undefined : () => setTopic(topicName)
                        }
                        style={{
                          cursor: saving ? "not-allowed" : "pointer",
                          opacity: saving ? 0.5 : 1,
                        }}
                      >
                        <p className={topicColors[topicName]}>{topicName}</p>
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
              )}

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
                          height: "auto",
                        }}
                      >
                        {description || "Описание отсутствует"}
                      </p>
                    )}
                    {fieldErrors.description && (
                      <p
                        role="alert"
                        style={{
                          color: "#d32f2f",
                          fontSize: "13px",
                          marginTop: "8px",
                        }}
                      >
                        {fieldErrors.description}
                      </p>
                    )}
                  </div>
                </form>
                <div>
                  <TaskCalendar
                    selectedDate={selectedDate}
                    onChange={
                      isEditing ? (date) => setSelectedDate(date) : undefined
                    }
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
                    <button
                      className="btn-edit__delete _btn-bor _hover03"
                      type="button"
                      onClick={handleDelete}
                      disabled={saving}
                    >
                      Удалить задачу
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
