const router = require('express').Router()

const tokenExtractor = require('../middleware/tokenExtractor')
const { Blog, ReadingList, User } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    if (req.body === null || req.body === undefined) {
      return res.status(400).end()
    }
    const { userId, blogId } = req.body

    const blogFound = await Blog.findByPk(blogId)

    if (!blogFound) {
      res.statusCode = 404
      return res.send({ error: "Blog not found" }).end()
    }

    const userFound = await User.findByPk(userId)

    if (!userFound) {
      res.statusCode = 404
      return res.send({ error: "User not found" }).end()
    }

    const readingListItemCreated = await ReadingList.create({ userId, blogId, isRead: false })
    res.json(readingListItemCreated)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {

    if (req.body === null || req.body === undefined) {
      return res.status(400).end()
    }
    if (isNaN(Number(req.params.id))) {
      return res.status(400).end()
    }

    const { read } = req.body

    if (typeof read !== 'boolean') {
      res.statusCode = 400
      return res.send({ error: "read must be true or false" }).end()
    }

    const readingListItemFound = await ReadingList.findByPk(Number(req.params.id))

    if (!readingListItemFound) {
      res.statusCode = 404
      return res.send({ error: "ReadingList not found" }).end()
    }

    if (readingListItemFound.userId !== req.decodedToken.id) {
      res.statusCode = 400
      return res.send({ error: "ReadingList belongs to another user" }).end()
    }

    readingListItemFound.isRead = read

    await readingListItemFound.save()
    return res.json(readingListItemFound)

  } catch (error) {
    next(error)
  }
})

module.exports = router