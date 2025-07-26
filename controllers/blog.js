const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogsFound = await Blog.findAll()
    if (blogsFound) {
      res.json(blogsFound)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.error("Error detected. Details:\n", error)
    res.status(500).end()
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, author, url, likes } = req.body
    if (!title) {
      res.statusCode = 400
      res.send("Title cannot be null").end()
    }
    if (!url) {
      res.statusCode = 400
      res.send("Url cannot be null").end()
    }
    const blogCreated = await Blog.create({ title, author, url, likes })
    res.json(blogCreated)
  } catch (error) {
    console.error("Error detected. Details:\n", error)
    res.status(500).end()
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const blogFound = await Blog.findByPk(req.params.id)
    if (blogFound) {
      await blogFound.destroy()
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.error("Error detected. Details:\n", error)
    res.status(500).end()
  }
})

router.put('/:id', async (req, res) => {
  try {
    const blogFound = await Blog.findByPk(req.params.id)
    const { likes } = req.body

    if (!blogFound) {
      res.status(404).end()
    }

    if (!likes || isNaN(Number(likes))) {
      res.statusCode = 400
      res.send("likes must be a whole number").end()
    }
    blogFound.likes = Number(likes)

    await blogFound.save()
    res.json(blogFound)
  } catch (error) {
    console.error("Error detected. Details:\n", error)
    res.status(500).end()
  }
})

module.exports = router