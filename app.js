const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const filesRouter = require('./routes/files');
const secretsRouter = require('./routes/secrets')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/health', indexRouter);
app.use('/users', usersRouter);
app.use('/files', filesRouter);
app.use('/secrets', secretsRouter)

module.exports = app; 
