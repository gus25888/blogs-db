const router = require('express').Router()

const tokenExtractor = require('../middleware/tokenExtractor')
const { Session } = require('../models')

router.delete('/', tokenExtractor, async (req, res) => {
  const userId = req.decodedToken.id

  if (userId) {
    await Session.destroy({
      where: {
        userId: userId,
      },
    })
  }

  res.sendStatus(200)
})

module.exports = router