const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('../routes/apiRouter.js')
const { customErrors, psqlErrors, allOtherErrors } = require('../db/utils/errorHandling')
const { methodNotAllowed } = require('../db/utils/errorHandling')

app.use(cors())

app.use(express.json());

app.use('/api', apiRouter).all(methodNotAllowed);

app.use(customErrors)
app.use(psqlErrors)
app.use(allOtherErrors)


module.exports = app