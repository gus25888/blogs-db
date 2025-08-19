const { Session, User } = require('../models')

const validateToken = async (token) => {
  const tokenFound = await Session.findOne({ where: { token: token } })

  if (!tokenFound) {
    return 'token expired'
  }

  // Validate the expiration of the token
  if ((new Date(Date.now()) > new Date(tokenFound.expirationDate))) {
    await tokenFound.destroy()
    return 'token expired'
  }

  const userFound = await User.findByPk(tokenFound.userId)
  // Validate the status of the user
  if (userFound.disabled) {
    await Session.destroy({
      where: {
        userId: userFound.id,
      },
    })
    return 'user disabled'
  }
}

module.exports = { validateToken }