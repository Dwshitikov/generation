# Генератор Сценариев - Telegram Mini App

Приложение для генерации сценариев для Reels видео, работающее в Telegram Mini App с интеграцией Firebase для отслеживания пользователей.

## Особенности

- Работает в Telegram Mini App
- Определяет новых и существующих пользователей
- Показывает интро только новым пользователям
- Хранит информацию о пользователях в Firebase Firestore
- Аналитика активности пользователей

## Настройка проекта

### 1. Создайте проект в Firebase

1. Перейдите на сайт [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект
3. Активируйте Firestore Database и Analytics
4. В настройках проекта создайте веб-приложение
5. Скопируйте конфигурацию Firebase

### 2. Настройте Firebase в проекте

Откройте файл `src/firebase.js` и замените конфигурацию на свою:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 3. Создайте Telegram Mini App

1. Напишите боту [@BotFather](https://t.me/BotFather) в Telegram
2. Создайте нового бота или выберите существующего
3. Используйте команду /mybots, выберите вашего бота
4. Перейдите в Bot Settings -> Menu Button
5. Установите Menu Button URL для вашего веб-приложения
6. Опционально настройте команду /start для запуска Mini App

### 4. Настройка сборки и деплоя

```bash
# Установка зависимостей
npm install

# Запуск для разработки
npm start

# Сборка для production
npm run build

# Деплой на Firebase Hosting (если требуется)
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## Структура проекта

- `/src` - исходный код приложения
  - `/components` - React-компоненты
  - `/styles` - CSS-стили
  - `/assets` - изображения и другие ресурсы
  - `firebase.js` - настройка Firebase
- `/public` - статические файлы
- `/functions` - Firebase Cloud Functions (если используются)

## Разработка

### Получение chat_id в Telegram Mini App

Приложение автоматически получает chat_id пользователя при открытии в Telegram:

```js
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;
if (user?.id) {
  setChatId(user.id);
}
```

### Работа с Firestore

Приложение использует Firestore для:
- Проверки существующих пользователей
- Сохранения данных пользователей
- Отслеживания активности

## Лицензия

MIT
