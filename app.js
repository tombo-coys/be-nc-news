const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter.js')
const { customErrors, psqlErrors } = require('./db/utils/errorHandling')

app.use(express.json());

app.use('/api', apiRouter);

app.use(customErrors)
app.use(psqlErrors)


module.exports = app