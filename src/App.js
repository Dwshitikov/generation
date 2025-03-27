import React, { useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import './styles/HomeScreen.css'; // глобальные стили
import backgroundImage from './assets/myBackground.jpg';
import { app, analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

function App() {
  useEffect(() => {
    // Логирование события открытия приложения в Firebase Analytics
    try {
      logEvent(analytics, 'app_open', {
        timestamp: new Date().toString(),
        platform: 'telegram_mini_app'
      });
    } catch (error) {
      console.error('Ошибка при логировании события:', error);
    }
  }, []);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <HomeScreen />
    </div>
  );
}

export default App;
