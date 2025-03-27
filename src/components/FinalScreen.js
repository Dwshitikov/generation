import React, { useState, useEffect } from "react";
import "./FinalScreen.css";

export default function FinalScreen({ onFinish }) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    // Запускаем анимацию появления заголовка
    setHeaderVisible(true);
    // С задержкой запускаем анимацию появления кнопки
    setTimeout(() => {
      setButtonVisible(true);
    }, 500);
  }, []);

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className={`header ${headerVisible ? "visible" : ""}`}>
          {/* Заголовок с градиентным текстом */}
          <h1 className="title gradient-text">
            Готово. Твой продюсер включён.
          </h1>

          {/* Прогресс-бар: четвёртый шаг активен */}
          <div className="steps-container">
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step step-active"></div>
          </div>

          {/* Текст */}
          <p className="subtitle">
            Мы запомнили, кто ты и как говоришь.<br />
            Теперь просто напиши идею — и сценарий появится сам.
          </p>
        </div>

        {/* Контейнер для кнопки */}
        <div className={`button-wrapper ${buttonVisible ? "visible" : ""}`}>
          <div className="gradient-border">
            <button className="button" onClick={onFinish}>
              Начать ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 