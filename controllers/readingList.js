const router = require('express').Router()

const { ReadingList } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const { userId, blogId } = req.body
    const readingListItemCreated = await ReadingList.create({ userId, blogId, isRead: false })
    res.json(readingListItemCreated)
  } catch (error) {
    next(error)
  }
})

module.exports = router