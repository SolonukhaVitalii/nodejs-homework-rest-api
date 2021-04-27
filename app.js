const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { httpCodes } = require('./helpers/code')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : httpCodes.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status: err.status === 500 ? 'Fail' : 'Error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? httpCodes.INTERNAL_SERVER_ERROR : err.data,
  })
})

module.exports = app
