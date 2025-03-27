const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Инициализация Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Функция для создания структуры базы данных и добавления тестовых данных
async function initializeFirestore() {
  try {
    // Создаем тестового пользователя
    const testUserId = '12345678'; // Тестовый chat_id из Telegram
    
    await db.collection('telegram_users').doc(testUserId).set({
      chatId: testUserId,
      firstVisit: admin.firestore.Timestamp.now(),
      hasCompletedOnboarding: true,
      lastVisit: admin.firestore.Timestamp.now(),
      gender: 'male',
      age: '25-34',
      niches: ['tech', 'business'],
      totalGenerations: 0,
      lastActivity: admin.firestore.Timestamp.now()
    });
    
    console.log('База данных Firestore успешно инициализирована с тестовыми данными!');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при инициализации Firestore:', error);
    process.exit(1);
  }
}

// Запускаем инициализацию
initializeFirestore(); 