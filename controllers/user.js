const router = require('express').Router()
const { Op } = require('sequelize')
const { User, Blog } = require('../models')
const { encryptPassword, validatePassword } = require('../util/misc')

router.get('/', async (req, res) => {

  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    },

  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    let { username, name, password } = req.body
    if (username.length < 4 || username.length > 10) {
      return res.status(400).json({ error: `Username must have a between 4 and 10 characters` })
    }
    if (!password) {
      password = username + '_123'
    }
    const validatePasswordResult = validatePassword(password)

    if (validatePasswordResult) {
      return res.status(400).json({ error: validatePasswordResult })
    }
    const passwordHash = await encryptPassword(password)
    const user = await User.create({ username, name, password: passwordHash })
    const userCreated = { username: user.username, name: user.name, createdAt: user.createdAt, updatedAt: user.updatedAt }

    return res.json(userCreated)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: { [Op.eq]: req.params.username }
      }
    })
    if (!user)
      return res.status(404).end()

    if (!req.body.username) {
      return res.status(400).json({ error: "username not specified" })
    }

    if (req.body.username.length < 4 || req.body.username.length > 10) {
      return res.status(400).json({ error: `Username must have a between 4 and 10 characters` })
    }
    user.username = req.body.username

    await user.save()
    const userUpdated = { username: user.username, name: user.name, createdAt: user.createdAt, updatedAt: user.updatedAt }
    return res.json(userUpdated)
  } catch (error) {
    next(error)
  }
})

module.exports = router