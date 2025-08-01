const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { checkPassword } = require('../util/misc')

router.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({
    where: {
      username: username
    }
  })
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

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router