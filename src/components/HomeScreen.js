import React, { useState, useEffect } from 'react';
import { MdMovieFilter } from 'react-icons/md';
import '../styles/HomeScreen.css';
import creativeProcess from '../assets/images/creative-process.png';
// Импортируем все изображения целей
import viewsImage from '../assets/images/views.jpg';
import salesImage from '../assets/images/sales.jpg';
import educationImage from '../assets/images/education.jpg';
import entertainmentImage from '../assets/images/entertainment.jpg';
import personalBrandImage from '../assets/images/personal-brand.jpg';
import noGoalImage from '../assets/images/no-goal.jpg';
import introAnimation from '../assets/videos/intro.mp4'; // или .mp4 если видео
import backgroundImage from '../assets/myBackground.jpg';
import GenderScreen from './GenderScreen';
import AgeScreen from './AgeScreen';
import NicheScreen from './NicheScreen';
import FinalScreen from './FinalScreen';
import { db } from '../firebase';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';

const TAGS = [
  { 
    label: 'Привлечь больше просмотров', 
    image: viewsImage 
  },
  { 
    label: 'Продать продукт / услугу', 
    image: salesImage 
  },
  { 
    label: 'Обучить аудиторию', 
    image: educationImage
  },
  { 
    label: 'Развлечь и повысить вовлечение', 
    image: entertainmentImage
  },
  { 
    label: 'Личный Бренд', 
    image: personalBrandImage
  },
  { 
    label: 'Создать сценарий без конкретной цели', 
    image: noGoalImage
  },
];

function HomeScreen() {
  // Шаги: 0 – ввод описания, 1 – выбор цели, 2 – предпросмотр и генерация.
  const [currentStep, setCurrentStep] = useState(0);
  const [eventText, setEventText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [presentationType, setPresentationType] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showGenderSelect, setShowGenderSelect] = useState(true);
  const [gender, setGender] = useState(null);
  const [showAgeSelect, setShowAgeSelect] = useState(true);
  const [age, setAge] = useState(null);
  const [showNicheSelect, setShowNicheSelect] = useState(true);
  const [niches, setNiches] = useState([]);
  const [showFinalScreen, setShowFinalScreen] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isCheckingUser, setIsCheckingUser] = useState(true);

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

    if (!presentationType) {
      window.alert('⚠️ Пожалуйста, выберите тип презентации (с голосом или текстом)');
      return;
    }

    setIsAnimating(true);

    try {
      // Логируем события пользователя в Firestore
      if (chatId && chatId !== 'chat_id_not_found') {
        const userRef = doc(db, 'telegram_users', chatId);
        await setDoc(userRef, {
          lastActivity: new Date(),
          lastGenerationText: eventText,
          totalGenerations: increment(1), // Используем Firebase increment для атомарного обновления счетчика
          selectedTags: selectedTags,
          presentationType: presentationType
        }, { merge: true });
      }

      window.alert(`🎬 Работаем над сценарием
Представь, будто у тебя собственный продюсер 💼
Сценарий появится в чате в течение минуты.`);

      const response = await fetch('https://us-central1-mini-ao-c2901.cloudfunctions.net/generate_scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          eventText: eventText,
          selectedTags: selectedTags,
          presentationType: presentationType
        })
      });

      const result = await response.json();
      setIsAnimating(false);

      if (response.ok && result.status === 'ok') {
        if (window.Telegram) {
          window.Telegram.WebApp.close();
        }
      } else {
        window.alert('Ошибка: ' + result.message);
      }

    } catch (error) {
      setIsAnimating(false);
      console.error('Подробности ошибки:', error);
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
              <h2 className="section-title">Опиши, о чём будет твой Reels — подробно или просто в двух словах.</h2>
              <div className="input-wrapper">
                <div className="input-blur">
                  <textarea
                    className="search-input"
                    placeholder="Типа: «Как я пошла на маникюр и попала в неловкую ситуацию…»
Или: «Просто: утренний уход»"
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
                src={creativeProcess}
                alt="Иллюстрация креативного процесса"
                className="extra-image"
              />
              <p className="illustration-text">
                Твоя популярность начинается с одного клика 💥
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

            <div className="presentation-type-container">
              <h3 className="presentation-type-title">
                Как ты хочешь подать сценарий?
              </h3>
              <div className="presentation-options">
                <button
                  className={`presentation-option ${presentationType === 'voice' ? 'selected' : ''}`}
                  onClick={() => setPresentationType('voice')}
                >
                  <span className="option-icon">🎙️</span>
                  <div className="option-content">
                    <span className="option-title">С голосом</span>
                    <span className="option-subtitle">Подойдёт, если ты будешь озвучивать видео сама</span>
                  </div>
                </button>

                <button
                  className={`presentation-option ${presentationType === 'text' ? 'selected' : ''}`}
                  onClick={() => setPresentationType('text')}
                >
                  <span className="option-icon">✍️</span>
                  <div className="option-content">
                    <span className="option-title">Только текст на экране</span>
                    <span className="option-subtitle">Идеально, если Reels будет без голоса — только надписи</span>
                  </div>
                </button>
              </div>
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
    // Если вы тестируете ЛОКАЛЬНО, вряд ли window.Telegram есть.
    // Можно закомментировать или оставить:
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
    } else {
      // Если Telegram WebApp недоступен, используем тестовый
      setChatId('6045806877'); 
    }
  }, [chatId]);

  useEffect(() => {
    if (window.Telegram) {
      // Устанавливаем черный цвет заголовка
      window.Telegram.WebApp.setHeaderColor('#000000');
    }
  }, []);

  useEffect(() => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(200);
    }

    // Автоматическое закрытие интро для новых пользователей через 5 секунд
    if (isNewUser && showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isNewUser, showIntro]);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setShowGenderSelect(false);
  };

  const handleAgeSelect = (selectedAge) => {
    setAge(selectedAge);
    setShowAgeSelect(false);
  };

  const handleNicheSelect = (selectedNiches) => {
    setNiches(selectedNiches);
    setShowNicheSelect(false);
  };

  useEffect(() => {
    const checkUserInFirebase = async () => {
      if (!chatId || chatId === 'chat_id_not_found') return;
      
      try {
        // Проверяем, существует ли пользователь в Firestore
        const userRef = doc(db, 'telegram_users', chatId);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          // Пользователь существует, не показываем интро
          console.log('Существующий пользователь:', chatId);
          setIsNewUser(false);
          setShowIntro(false);
          setShowGenderSelect(false);
          setShowAgeSelect(false);
          setShowNicheSelect(false);
          setShowFinalScreen(false);
        } else {
          // Новый пользователь, показываем интро и сохраняем в Firestore
          console.log('Новый пользователь:', chatId);
          setIsNewUser(true);
          
          // Записываем пользователя в базу данных
          await setDoc(userRef, {
            chatId: chatId,
            firstVisit: new Date(),
            hasCompletedOnboarding: false
          });
        }
      } catch (error) {
        console.error('Ошибка при проверке пользователя:', error);
      } finally {
        setIsCheckingUser(false);
      }
    };
    
    if (chatId) {
      checkUserInFirebase();
    }
  }, [chatId]);

  const handleFinish = async () => {
    setShowFinalScreen(false);
    
    if (chatId && chatId !== 'chat_id_not_found') {
      try {
        // Обновляем статус онбординга в Firestore
        const userRef = doc(db, 'telegram_users', chatId);
        await setDoc(userRef, {
          chatId: chatId,
          hasCompletedOnboarding: true,
          gender: gender,
          age: age,
          niches: niches,
          lastVisit: new Date()
        }, { merge: true });
        
        console.log('Пользователь успешно прошел онбординг');
      } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
      }
    }
  };

  if (isCheckingUser) {
    return (
      <div className="loading-screen">
        <div className="loading-animation"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (isNewUser && showIntro) {
    return (
      <div className="intro-screen">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="intro-animation-full"
        >
          <source src={introAnimation} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (isNewUser && showGenderSelect) {
    return <GenderScreen onGenderSelect={handleGenderSelect} />;
  }

  if (isNewUser && showAgeSelect) {
    return <AgeScreen onAgeSelect={handleAgeSelect} />;
  }

  if (isNewUser && showNicheSelect) {
    return <NicheScreen onNicheSelect={handleNicheSelect} />;
  }

  if (isNewUser && showFinalScreen) {
    return <FinalScreen onFinish={handleFinish} />;
  }

  return (
    <div className="safe-area">
      <div 
        className="container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
        }}
      >
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
