const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());

// App routes
const userHandler = require('./controllers/users');
app.use('/api/v1/users', userHandler);

const secretHandler = require('./controllers/secrets');
app.use('/api/v1/secrets', secretHandler);
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
