const express = require('express')
const Blogs = require('./Blogs')

const app = express()
app.use(express.json())

const endpoint = '/api/blogs'
app.get(endpoint, async (req, res) => {
  try {
    const blogsFound = await Blogs.findAll()
    if (blogsFound) {
      res.json(blogsFound)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.error("Error detected. Details:", error)
    res.status(500).end()
  }
})
app.post(endpoint, async (req, res) => {
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
    const blogCreated = await Blogs.create({ title, author, url, likes })
    res.json(blogCreated)
  } catch (error) {
    console.error("Error detected. Details:", error)
    res.status(500).end()
  }
})
app.delete(`${endpoint}/:id`, async (req, res) => {
  try {
    const blogFound = await Blogs.findByPk(req.params.id)
    if (blogFound) {
      await blogFound.destroy()
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.error("Error detected. Details:", error)
    res.status(500).end()
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})