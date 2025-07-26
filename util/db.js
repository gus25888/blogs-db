const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.info('*** Connected to the database ***')
  } catch (err) {
    console.error('*** FAILED to connect to the database ***')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }