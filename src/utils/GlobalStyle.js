import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  @keyframes card-animation {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: #000000;
    background-color: #eaeef6;
  }

  body {
    margin: 0;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  ._orange {
    background-color: #ffe4c2;
    color: #ff6d00;
  }

  ._green {
    background-color: #b4fdd1;
    color: #06b16e;
  }

  ._purple {
    background-color: #e9d4ff;
    color: #9a48f1;
  }

  ._active-category {
    opacity: 1 !important;
  }

  .subttl {
    color: #000;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
  }

  .pop-new-card,
  .pop-browse {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }

  .pop-new-card__container,
  .pop-browse__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.45);
  }

  .pop-new-card__block,
  .pop-browse__block {
    margin: 0 auto;
    background-color: #ffffff;
    max-width: 630px;
    width: 100%;
    padding: 30px;
    border-radius: 10px;
    border: 0.7px solid #d4dbe5;
    position: relative;
  }

  .pop-new-card__ttl,
  .pop-browse__ttl {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .pop-new-card__close {
    position: absolute;
    top: 16px;
    right: 18px;
    color: #94a6be;
    cursor: pointer;
    border: none;
    background: transparent;
    font-size: 20px;
  }

  .pop-new-card__wrap,
  .pop-browse__wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
  }

  .pop-new-card__form,
  .pop-browse__form {
    max-width: 370px;
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }

  .form-new__block,
  .form-browse__block {
    display: flex;
    flex-direction: column;
  }

  .form-new__input,
  .form-new__area,
  .form-browse__area {
    width: 100%;
    outline: none;
    padding: 14px;
    background: transparent;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    border-radius: 8px;
    font-size: 14px;
    letter-spacing: -0.14px;
  }

  .form-new__input {
    margin: 16px 0;
  }

  .form-new__area,
  .form-browse__area {
    margin-top: 14px;
    height: 200px;
    resize: none;
  }

  .form-browse__area {
    background: #eaeef6;
  }

  .categories {
    margin-bottom: 20px;
  }

  .categories__p,
  .status__p {
    margin-bottom: 14px;
  }

  .categories__themes,
  .status__themes {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 7px;
  }

  .categories__theme {
    display: inline-block;
    border-radius: 24px;
    opacity: 0.4;
  }

  .categories__theme p,
  .card__theme p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    white-space: nowrap;
    padding: 8px 20px;
    border-radius: 24px;
  }

  .pop-browse__top-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .status {
    margin-bottom: 14px;
  }

  .status__theme {
    border-radius: 24px;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    color: #94a6be;
    padding: 11px 14px 10px;
  }

  .status__theme._active {
    background: #94a6be;
    color: #ffffff;
    border-color: #94a6be;
  }

  .status__theme p {
    font-size: 14px;
    line-height: 1;
  }

  .calendar {
    width: 182px;
    margin-bottom: 20px;
  }

  .calendar__ttl {
    margin-bottom: 14px;
  }

  .calendar__month {
    color: #94a6be;
    font-size: 14px;
    line-height: 25px;
    font-weight: 500;
  }

  .calendar__content {
    margin-bottom: 12px;
  }

  .calendar__days-names {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 7px 0;
  }

  .calendar__day-name {
    color: #94a6be;
    font-size: 10px;
    font-weight: 500;
    width: 20px;
    text-align: center;
  }

  .calendar__cells {
    width: 182px;
    display: flex;
    flex-wrap: wrap;
  }

  .calendar__cell {
    width: 22px;
    height: 22px;
    margin: 2px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a6be;
    font-size: 10px;
  }

  ._other-month {
    opacity: 0;
  }

  ._active-day {
    background-color: #94a6be;
    color: #ffffff;
  }

  ._current {
    font-weight: 700;
  }

  .calendar__nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
  }

  .nav__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav__action {
    width: 18px;
    height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a6be;
    font-size: 16px;
  }

  .calendar__p {
    color: #94a6be;
    font-size: 12px;
  }

  .calendar__p span {
    color: #000;
    font-weight: 500;
  }

  .calendar--picker {
    width: auto;
  }

  .task-datepicker {
    border: none;
    width: 222px;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    background: transparent;
  }

  .task-datepicker .react-datepicker__month-container {
    width: 222px;
  }

  .task-datepicker .react-datepicker__header {
    background: transparent;
    border-bottom: 0;
    padding-top: 0;
  }

  .task-datepicker .react-datepicker__current-month {
    color: #94a6be;
    font-size: 14px;
    font-weight: 500;
    line-height: 25px;
    margin-bottom: 8px;
  }

  .task-datepicker .react-datepicker__day-name {
    color: #94a6be;
    font-size: 10px;
    font-weight: 500;
    width: 22px;
    line-height: 22px;
    margin: 2px;
  }

  .task-datepicker .react-datepicker__day {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin: 2px;
    padding: 0;
    border-radius: 50% !important;
    color: #94a6be;
    font-size: 10px;
    text-align: center;
  }

  .task-datepicker .react-datepicker__day--selected,
  .task-datepicker .react-datepicker__day--keyboard-selected {
    background-color: #94a6be !important;
    color: #ffffff !important;
    border-radius: 50% !important;
  }

  .task-datepicker .react-datepicker__day--in-range {
    border-radius: 50% !important;
  }

  .task-datepicker .react-datepicker__day--today {
    font-weight: 500;
    border-radius: 50% !important;
  }

  .task-datepicker .react-datepicker__navigation {
    top: 6px;
  }

  .task-datepicker .react-datepicker__navigation-icon::before {
    border-color: #94a6be;
    border-width: 2px 2px 0 0;
  }

  .task-datepicker .react-datepicker__day--outside-month {
    opacity: 0;
  }

  ._btn-bor {
    border-radius: 4px;
    border: 0.7px solid #565eef;
    background: transparent;
    color: #565eef;
    height: 30px;
    padding: 0 14px;
  }

  ._btn-bg {
    border-radius: 4px;
    background: #565eef;
    border: none;
    color: #ffffff;
    height: 30px;
    padding: 0 14px;
  }

  .form-new__create {
    width: 132px;
    height: 30px;
    background-color: #565eef;
    border-radius: 4px;
    border: 0;
    color: #ffffff;
    float: right;
  }

  .pop-browse__btn-edit,
  .pop-browse__btn-browse {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
  }

  .pop-browse__btn-edit .btn-group,
  .pop-browse__btn-browse .btn-group {
    display: flex;
    gap: 8px;
  }
`;
