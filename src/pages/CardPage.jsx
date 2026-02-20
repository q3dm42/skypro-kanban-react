import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isValid, parse } from "date-fns";
import HomePage from "./HomePage";
import data from "../../data";
import TaskCalendar from "../components/TaskCalendar/TaskCalendar";

const statuses = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = data.find((card) => card.id === Number(id)) || data[0];
  const parsedDate = parse(task.date, "dd.MM.yy", new Date());
  const [selectedDate, setSelectedDate] = useState(
    isValid(parsedDate) ? parsedDate : null,
  );

  const closeModal = () => {
    navigate("/");
  };

  return (
    <>
      <HomePage />
      <div className="pop-browse" style={{ display: "block" }}>
        <div className="pop-browse__container">
          <div className="pop-browse__block">
            <div className="pop-browse__content">
              <div className="pop-browse__top-block">
                <h3 className="pop-browse__ttl">{task.title}</h3>
                <div className="card__theme">
                  <p className={`${task.themeClass} _active-category`}>
                    {task.topic}
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
                        statusName === task.status ? "_active" : ""
                      }`}
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
                      defaultValue={task.title}
                      placeholder="Введите описание задачи..."
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
                  >
                    Сохранить
                  </button>
                  <button
                    className="btn-edit__edit _btn-bor _hover03"
                    type="button"
                    onClick={closeModal}
                  >
                    Отменить
                  </button>
                  <button
                    className="btn-edit__delete _btn-bor _hover03"
                    type="button"
                  >
                    Удалить задачу
                  </button>
                </div>
                <button
                  className="btn-edit__close _btn-bg _hover01"
                  type="button"
                  onClick={closeModal}
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
