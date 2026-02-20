import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import TaskCalendar from "../components/TaskCalendar/TaskCalendar";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

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
              <div className="pop-new-card__wrap">
                <form className="pop-new-card__form form-new">
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
                    ></textarea>
                  </div>
                  <div className="pop-new-card__categories categories">
                    <p className="categories__p subttl">Категория</p>
                    <div className="categories__themes">
                      <div className="categories__theme _orange _active-category">
                        <p className="_orange">Web Design</p>
                      </div>
                      <div className="categories__theme _green">
                        <p className="_green">Research</p>
                      </div>
                      <div className="categories__theme _purple">
                        <p className="_purple">Copywriting</p>
                      </div>
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
                  onClick={closeModal}
                >
                  Создать задачу
                </button>
                <button
                  type="button"
                  className="_btn-bor _hover03"
                  onClick={closeModal}
                  style={{ padding: "0 14px" }}
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
