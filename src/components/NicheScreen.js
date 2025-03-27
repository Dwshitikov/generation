import React, { useState, useEffect } from "react";
import "./NicheScreen.css";

export default function NicheScreen({ onNicheSelect }) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [selectedNiches, setSelectedNiches] = useState([]);

  useEffect(() => {
    // Запускаем анимацию появления заголовка
    setHeaderVisible(true);
    // С задержкой запускаем анимацию появления кнопок
    setTimeout(() => {
      setButtonsVisible(true);
    }, 500);
  }, []);

  const toggleNiche = (niche) => {
    // Обновляем выбранные ниши
    const newSelectedNiches = selectedNiches.includes(niche)
      ? selectedNiches.filter(n => n !== niche)
      : [...selectedNiches, niche];
    
    setSelectedNiches(newSelectedNiches);
    
    // Если выбрана хотя бы одна ниша, переходим к следующему экрану после небольшой задержки
    if (newSelectedNiches.length > 0) {
      setTimeout(() => {
        onNicheSelect(newSelectedNiches);
      }, 300); // Небольшая задержка для анимации
    }
  };

  // Функция для рендера "чекбокса" (кнопки) с градиентной рамкой
  const renderCheckbox = (text, value) => {
    const isSelected = selectedNiches.includes(value);
    return (
      <div className={`gradient-border ${isSelected ? 'selected' : ''}`}>
        <button 
          className={`button ${isSelected ? 'selected' : ''}`} 
          onClick={() => toggleNiche(value)}
        >
          {text}
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className={`header ${headerVisible ? "visible" : ""}`}>
          {/* Заголовок с градиентным текстом */}
          <h1 className="title gradient-text">Что ты снимаешь?</h1>

          {/* Прогресс-бар, где третий шаг активен */}
          <div className="steps-container">
            <div className="step"></div>
            <div className="step"></div>
            <div className="step step-active"></div>
            <div className="step"></div>
          </div>

          {/* Подпояснение */}
          <p className="subtitle">
            У нас нет шаблонов "на всё".<br />
            Зато есть сценарии под моду, бьюти, бизнес, экспертку, лайфстайл и душевные разговоры.<br />
            Выбери своё — и мы дадим лучшее.
          </p>
        </div>

        {/* Контейнер кнопок */}
        <div className={`buttons ${buttonsVisible ? "visible" : ""}`}>
          {renderCheckbox("Личный блог", "personal")}
          {renderCheckbox("Бьюти", "beauty")}
          {renderCheckbox("Мода", "fashion")}
          {renderCheckbox("Саморазвитие", "selfdev")}
          {renderCheckbox("Бизнес / Эксперт", "business")}
          {renderCheckbox("Продукт / Бренд", "product")}
          {renderCheckbox(`Видео "для души"`, "soul")}
        </div>
      </div>
    </div>
  );
} 