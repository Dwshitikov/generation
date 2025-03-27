exports.generate_scenario = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { chat_id, eventText, selectedTags, presentationType } = req.body;

      // Проверяем обязательные поля
      if (!eventText || eventText.trim().length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Поле eventText пустое'
        });
      }

      if (!presentationType || !['voice', 'text'].includes(presentationType)) {
        return res.status(400).json({
          status: 'error',
          message: 'Некорректный тип презентации'
        });
      }

      // Формируем сообщение для GPT с учетом типа презентации
      const prompt = `
Создай сценарий для Instagram Reels о: "${eventText}"

Цели видео: ${selectedTags.join(', ')}
Тип презентации: ${presentationType === 'voice' ? 'С голосовым сопровождением' : 'Только текст на экране'}

${presentationType === 'voice' ? 
  'Формат: Напиши текст для озвучки и описание кадров' : 
  'Формат: Напиши текст, который будет появляться на экране, и описание кадров'}
`;

      // ... остальной код обработки ...

    } catch (error) {
      console.error('Ошибка:', error);
      res.status(500).json({
        status: 'error',
        message: 'Внутренняя ошибка сервера'
      });
    }
  });
}); 