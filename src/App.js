import React from 'react';
import HomeScreen from './components/HomeScreen';
import './styles/HomeScreen.css'; // глобальные стили
import backgroundImage from './assets/myBackground.jpg';

function App() {
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
