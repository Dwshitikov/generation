import React, { useState, useEffect } from "react";
import "./GenderScreen.css";

export default function GenderScreen({ onGenderSelect }) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
    setTimeout(() => {
      setButtonsVisible(true);
    }, 500);
  }, []);

  const renderButton = (text, value) => (
    <div className="gradient-border">
      <button className="button" onClick={() => onGenderSelect(value)}>
        {text}
      </button>
    </div>
  );

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className={`header ${headerVisible ? "visible" : ""}`}>
          <h1 className="title gradient-text">Укажи свой пол</h1>

          <div className="steps-container">
            <div className="step step-active"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
          </div>

          <p className="subtitle">
            Это нужно не для отчёта. Это нужно, чтобы сценарий звучал как ты.
            <br />
            Даже если ты снимаешь про бизнес, продукт или блог — интонация важна.
            <br />
            И мы не хотим ошибиться.
          </p>
        </div>

        <div className={`buttons ${buttonsVisible ? "visible" : ""}`}>
          {renderButton("👩 Девушка", "female")}
          {renderButton("👨 Парень", "male")}
          {renderButton(
            "🧾 Бренд или безличный аккаунт",
            "brand"
          )}
        </div>
      </div>
    </div>
  );
} 