import React, { useState, useEffect } from 'react';
import { MdMovieFilter } from 'react-icons/md';
import '../styles/HomeScreen.css';

const TAGS = [
  { 
    label: 'Привлечь больше просмотров', 
    image: 'https://i.pinimg.com/736x/42/11/f1/4211f1314a7649090dd50fdfd253bbe5.jpg' 
  },
  { 
    label: 'Продать продукт / услугу', 
    image: 'https://i.pinimg.com/736x/c4/35/03/c43503d818f590a1024ea55419b68656.jpg' 
  },
  { 
    label: 'Обучить аудиторию', 
    image: 'https://i.pinimg.com/736x/93/c0/bd/93c0bde9851801cfe21824b882fb86cf.jpg'
  },
  { 
    label: 'Развлечь и повысить вовлечение', 
    image: 'https://i.pinimg.com/736x/83/00/93/83009330280c1dc866ba704358c1efd6.jpg'
  },
  { 
    label: 'Личный Бренд', 
    image: 'https://i.pinimg.com/474x/d9/55/fb/d955fb95556c69960b4c8b894bda258a.jpg'
  },
  { 
    label: 'Создать сценарий без конкретной цели', 
    image: 'https://i.pinimg.com/736x/e5/0d/a9/e50da9f5c9cadc4f69316233c6b78721.jpg'
  },
];

function HomeScreen() {
  // Шаги: 0 – ввод описания, 1 – выбор цели, 2 – предпросмотр и генерация.
  const [currentStep, setCurrentStep] = useState(0);
  const [eventText, setEventText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [chatId, setChatId] = useState(null);

  const toggleTag = (tagLabel) => {
    setSelectedTags((prev) =>
      prev.includes(tagLabel)
        ? prev.filter((t) => t !== tagLabel)
        : [...prev, tagLabel]
    );
  };

  const handleGenerate = async () => {
    if (!eventText.trim()) {
      window.alert('⚠️ Ой! Пожалуйста, опиши событие для генерации сценария.');
      return;
    }

    setIsAnimating(true);

    try {
      // Формируем объект данных для отправки боту
      const data = {
        eventText,
        selectedTags,
        chatId,
      };

      // Отправляем данные напрямую боту через sendData
      window.Telegram.WebApp.sendData(JSON.stringify(data));

      window.alert('🎬 Ваш запрос отправлен! Проверьте сообщения в Telegram.');
      setIsAnimating(false);
      
    } catch (error) {
      setIsAnimating(false);
      console.error('Ошибка при отправке данных:', error);
      window.alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
  };

  const nextStep = () => {
    if (currentStep === 0 && !eventText.trim()) {
      window.alert('⚠️ Ой! Пожалуйста, заполните описание события.');
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStepIndicator = () => (
    <div className="step-indicator-masked">
      <span className="step-text gradient-text">
        Этап {currentStep + 1} из 3
      </span>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="step-content">
              <h2 className="section-title">Опиши событие</h2>
              <div className="input-wrapper">
                <div className="input-blur">
                  <textarea
                    className="search-input"
                    placeholder="Например, как я сходила на маникюр 💅🏼"
                    value={eventText}
                    onChange={(e) => setEventText(e.target.value)}
                    rows="3"
                    aria-label="Поле ввода описания события"
                  />
                </div>
              </div>
            </div>
            <div className="illustration-container">
              <img
                src="https://i.ibb.co/JxffH5D/image-Photoroom.png"
                alt="Иллюстрация креативного процесса"
                className="extra-image"
              />
              <p className="illustration-text">
                Погрузись в мир креатива и будущего дизайна!
              </p>
            </div>
          </>
        );
      case 1:
        return (
          <div className="step-content">
            <h2 className="section-title">
              👉 Какого результата вы хотите от этого сценария?
            </h2>
            <div className="tags-container">
              {TAGS.map(({ label, image }) => {
                const isSelected = selectedTags.includes(label);
                return (
                  <div
                    key={label}
                    className={`tag-touchable ${
                      isSelected ? 'active-tag-touchable' : ''
                    }`}
                    onClick={() => toggleTag(label)}
                    role="button"
                    aria-label={`Цель ${label}`}
                  >
                    <div
                      className={`blur-container ${
                        isSelected ? 'selected-tag-shadow' : ''
                      }`}
                    >
                      <img src={image} alt={label} className="tag-image" />
                    </div>
                    <p className="filter-label">
                      {label} {isSelected ? '✅' : ''}
                    </p>
                    <p className="hint-text">
                      Нажми для {isSelected ? 'снятия выделения' : 'выбора'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 2:
        const selectedTagObjects = TAGS.filter((tag) =>
          selectedTags.includes(tag.label)
        );
        return (
          <div className="step-content">
            <h2 className="section-title">Генерация сценария</h2>
            <p className="info-text">
              Проверь введённые данные. Если всё верно, нажми кнопку ниже для
              генерации сценария.
            </p>
            <div className="review-container">
              <p className="review-header">Описание события:</p>
              <p className="review-text">{eventText}</p>
              <p className="review-header">Выбранные цели:</p>
              {selectedTagObjects.length > 0 ? (
                <div className="tags-review-container">
                  {selectedTagObjects.map((tag) => (
                    <div key={tag.label} className="tag-review-item">
                      <img
                        src={tag.image}
                        alt={tag.label}
                        className="tag-review-image"
                      />
                      <p className="tag-review-text">{tag.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="review-text">Нет выбранных целей</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderNavigationButtons = () => {
    if (currentStep === 0) {
      return (
        <div className="navigation-container-centered">
          <button
            className="nav-button nav-button-fixed"
            onClick={nextStep}
            aria-label="Далее"
          >
            Далее
          </button>
        </div>
      );
    }
    return (
      <div className="navigation-container">
        {currentStep > 0 && (
          <button className="nav-button" onClick={prevStep} aria-label="Назад">
            Назад
          </button>
        )}
        {currentStep < 2 ? (
          <button className="nav-button" onClick={nextStep} aria-label="Далее">
            Далее
          </button>
        ) : (
          <button
            className={`button-gradient ${
              isAnimating ? 'animating' : ''
            }`}
            onClick={handleGenerate}
            aria-label="Сгенерировать сценарий"
          >
            Сгенерировать сценарий 🎬
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (window.Telegram) {
      window.Telegram.WebApp.ready();
      
      const tg = window.Telegram.WebApp;
      
      // Пробуем получить данные пользователя
      const user = tg.initDataUnsafe?.user;
      if (user?.id) {
        setChatId(user.id);
        console.log('Chat ID из user:', user.id);
      } else {
        // Используем тестовый chat_id для отладки
        setChatId('6045806877');
        console.log('Используется тестовый Chat ID');
      }
      
      const startParam = tg.initDataUnsafe?.start_param;
      if (startParam) {
        console.log('Start param:', startParam);
      }
      
      if (!chatId) {
        setChatId(tg.initDataUnsafe?.user?.id || tg.initDataUnsafe?.start_param || 'chat_id_not_found');
      }
      
      console.log('WebApp data:', tg.initDataUnsafe);
    }
  }, []);

  return (
    <div className="safe-area">
      <div className="container">
        <div className="header-row">
          <div style={{ flex: 1 }}>
            <h1 className="greeting-main" aria-label="Генератор сценариев">
              Генератор Сценариев
            </h1>
            <p className="greeting-sub">
              Напиши лучший сценарий для reels{' '}
              <MdMovieFilter color="#FF4081" size={16} />
            </p>
          </div>
        </div>
        {renderStepIndicator()}
        {renderStepContent()}
      </div>
      {renderNavigationButtons()}
    </div>
  );
}

export default HomeScreen;
