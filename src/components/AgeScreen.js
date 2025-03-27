import React, { useState, useEffect } from "react";
import "./AgeScreen.css";

export default function AgeScreen({ onAgeSelect }) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    // Запускаем анимацию появления заголовка
    setHeaderVisible(true);
    // С задержкой запускаем анимацию появления кнопок
    setTimeout(() => {
      setButtonsVisible(true);
    }, 500);
  }, []);

  // Функция для рендера кнопки с градиентной рамкой
  const renderButton = (text, value) => (
    <div className="gradient-border">
      <button className="button" onClick={() => onAgeSelect(value)}>
        {text}
      </button>
    </div>
  );

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className={`header ${headerVisible ? "visible" : ""}`}>
          {/* Заголовок с градиентным текстом */}
          <h1 className="title gradient-text">Возраст</h1>

          {/* Прогресс-бар, где второй шаг активен */}
          <div className="steps-container">
            <div className="step"></div>
            <div className="step step-active"></div>
            <div className="step"></div>
            <div className="step"></div>
          </div>

          {/* Поясняющий текст */}
          <p className="subtitle">
            А теперь немного про возраст<br />
            Чтобы не писать тебе "краш", если ты CEO.<br />
            И не грузить "архетипами бренда", если ты снимаешь про день из жизни.
          </p>
        </div>

        {/* Контейнер кнопок */}
        <div className={`buttons ${buttonsVisible ? "visible" : ""}`}>
          {renderButton("13-17", "13-17")}
          {renderButton("18-24", "18-24")}
          {renderButton("25-34", "25-34")}
          {renderButton("35-44", "35-44")}
          {renderButton("45+", "45+")}
        </div>
      </div>
    </div>
  );
} 