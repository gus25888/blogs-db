const router = require('express').Router()
const tokenExtractor = require('../middleware/tokenExtractor')
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

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {

    if (isNaN(Number(req.params.id))) {
      return res.status(400).end()
    }

    const readingListItemFound = await ReadingList.findOne({
      where: {
        blogId: Number(req.params.id),
        userId: req.decodedToken.id
      }
    })

    if (!readingListItemFound) {
      return res.status(404).end()
    }

    const { read } = req.body

    if (!read || typeof read !== 'boolean') {
      res.statusCode = 400
      return res.send({ error: "read must be true or false" }).end()
    }

    readingListItemFound.isRead = read

    await readingListItemFound.save()
    return res.json(readingListItemFound)
  } catch (error) {
    next(error)
  }
})

module.exports = router