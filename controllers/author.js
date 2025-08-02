const router = require('express').Router()
const { fn, col } = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const articlesPerAuthor = await Blog.findAll({
      attributes: [
        // COALESCE obtiene el primer valor NO nulo de los que se entreguen.
        [fn('COALESCE', col('author'), 'N/A'), 'author'],
        [fn('COUNT', col('title')), 'articles'],
        [fn('SUM', col('likes')), 'likes']
      ],
      group: 'author',
      order: [
        ['likes', 'DESC'],
      ],
    })

    if (articlesPerAuthor) {
      res.json(articlesPerAuthor)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router