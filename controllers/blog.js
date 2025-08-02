const router = require('express').Router()

const { Blog, User } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')

router.get('/', async (req, res, next) => {
  try {
    const blogsFound = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      }
    })
    if (blogsFound) {
      res.json(blogsFound)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body
    const user = await User.findByPk(req.decodedToken.id)
    const blogCreated = await Blog.create({ title, author, url, likes, userId: user.id })
    res.json(blogCreated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    const blogFound = await Blog.findByPk(req.params.id)

    if (blogFound) {
      if (blogFound.userId !== user.id) {
        res.statusCode = 400
        return res.send({ error: "Cannot delete a blog owned by another user" }).end()
      }

      await blogFound.destroy()
      return res.status(204).end()
    } else {
      return res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blogFound = await Blog.findByPk(req.params.id)
    const { likes } = req.body

    if (!blogFound) {
      res.status(404).end()
    }

    if (!likes || isNaN(Number(likes))) {
      res.statusCode = 400
      res.send({ error: "likes must be a whole number" }).end()
    }
    blogFound.likes = Number(likes)

    await blogFound.save()
    res.json(blogFound)
  } catch (error) {
    next(error)
  }
})

module.exports = router