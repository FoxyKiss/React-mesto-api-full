const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/NotFoundError');
const corsRequest = require('./middlewares/corsRequest');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// ? Создать Порт и Express сервер
const { PORT = 3000 } = process.env;
const app = express();
// ? Подключение к DB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// ? Работа с роутами
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(corsRequest);

app.use(requestLogger);

app.use(helmet);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер the END');
  }, 0);
});

app.use(require('./routes/auth'));

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Адреса по вашему запросу не существует'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

// ? Запуск сервера
app.listen(PORT, () => {
});
