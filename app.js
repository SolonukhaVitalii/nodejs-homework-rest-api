const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { httpCodes } = require('./src/helpers/code-constans');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactsRouter = require('./src/routes/api/contacts');
const usersRouter = require('./src/routes/api/users');
const path = require('path');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    next({
      status: httpCodes.BAD_REQUEST,
      message: 'Вы исчерпали количество запросов за 15 минут',
    });
  },
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', apiLimiter);
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : httpCodes.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'Fail' : 'Error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? httpCodes.INTERNAL_SERVER_ERROR : err.data,
  });
});

module.exports = app;