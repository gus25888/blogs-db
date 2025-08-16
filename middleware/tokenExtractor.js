const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')
const Session = require('../models/session')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      const tokenFound = await Session.findOne({ where: { token: token } })

      if (!tokenFound) {
        return res.status(401).json({ error: 'token expired' })
      }

      req.decodedToken = jwt.verify(token, SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = tokenExtractor