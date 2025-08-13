const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    const errorMessages = error.errors.map(err => err.message)
    return response.status(400).send({ error: errorMessages })
  }

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'wrong request data' })
  }

  next(error)
}

module.exports = { errorHandler }