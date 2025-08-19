const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { checkPassword } = require('../util/misc')

const { Session, User } = require('../models')

const TOKEN_EXPIRATION_MINUTES = 10 * 60

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

  const expirationDate = new Date(Date.now() + (TOKEN_EXPIRATION_MINUTES * 1000))
  const token = jwt.sign(userForToken, SECRET, { expiresIn: TOKEN_EXPIRATION_MINUTES })

  await Session.create({ token, userId: user.id, expirationDate })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router