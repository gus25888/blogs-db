const bcrypt = require('bcrypt')

const saltRounds = 10

const validatePassword = (password) => {
  let result = ""
  if (password.length < 8) {
    result = `Password must have a least 8 characters`
  }

  return result
}

const encryptPassword = async (password) => await bcrypt.hash(password, saltRounds)

module.exports = { encryptPassword, validatePassword }
