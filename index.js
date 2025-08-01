const express = require('express')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const { errorHandler } = require('./middleware/errorHandler')

const blogsRouter = require('./controllers/blog')
const authorsRouter = require('./controllers/author')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')


const app = express()
app.use(express.json())

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use('/api/blogs', blogsRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
start()