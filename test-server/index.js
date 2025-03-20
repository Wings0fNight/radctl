const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Добавляем CORS для обработки запросов с фронтенда

// Middleware для декодирования Basic Auth
const decodeBasicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Проверяем, есть ли заголовок Authorization и начинается ли он с "Basic "
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Извлекаем закодированные данные
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // Добавляем данные в объект запроса
  req.auth = { username, password };
  next();
};

// Эндпоинт для авторизации
app.post('/auth', decodeBasicAuth, (req, res) => {
  const { username, password } = req.auth;

  // Проверяем логин и пароль
  if (username === 'admin' && password === 'password') {
    // Возвращаем успешный ответ с данными, которые ожидает фронтенд
    res.status(200).json({ access: true, username, role: 'admin', message: 'Login successful' });
  } if (username === 'user' && password === 'password') {
	// Возвращаем успешный ответ с данными, которые ожидает фронтенд
	res.status(200).json({ access: true, username, role: 'user', message: 'Login successful' });
  } else {
    // Возвращаем ошибку, если данные неверны
    res.status(401).json({ access: false, message: 'Invalid credentials' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});