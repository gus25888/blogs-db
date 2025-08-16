const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { checkPassword } = require('../util/misc')

const Session = require('../models/session')
const User = require('../models/user')

const TOKEN_EXPIRATION = 60 * 60

router.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({
    where: {
      username: username
    }
  })

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const passwordCorrect = user === null
    ? false
    : await checkPassword(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const expirationDate = new Date(Date.now() + TOKEN_EXPIRATION)
  const token = jwt.sign(userForToken, SECRET, { expiresIn: TOKEN_EXPIRATION })

  await Session.create({ token, userId: user.id, expirationDate })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router