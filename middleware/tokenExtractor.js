const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')
const { validateToken } = require('../util/tokenManagement')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      const messageTokenStatus = await validateToken(token)
      if (messageTokenStatus) {
        return res.status(401).json({ error: messageTokenStatus })
      }
      req.decodedToken = jwt.verify(token, SECRET)
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = tokenExtractor