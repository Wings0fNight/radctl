const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); 

const decodeBasicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  req.auth = { username, password };
  next();
};

app.post('/auth', decodeBasicAuth, (req, res) => {
  const { username, password } = req.auth;


  if (username === 'admin' && password === 'password') {

    res.status(200).json({ access: true, message: 'role: admin, email: admin@mail.ru' });
  } if (username === 'user' && password === 'password') {
	// Возвращаем успешный ответ с данными, которые ожидает фронтенд
	res.status(200).json({ access: true, message: 'role: user, email: user@mail.ru' });
  } else {
    // Возвращаем ошибку, если данные неверны
    res.status(401).json({ access: false, message: 'Invalid credentials' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});