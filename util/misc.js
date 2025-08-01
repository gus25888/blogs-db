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

/**
 *
 * @param {string} passwordSent
 * @param {string} passwordHashStored
 * @returns boolean
 */
const checkPassword = async (passwordSent, passwordHashStored) => await bcrypt.compare(passwordSent, passwordHashStored)

module.exports = { checkPassword, encryptPassword, validatePassword }
