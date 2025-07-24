require('dotenv').config()
const { QueryTypes, Sequelize, } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const cli = async () => {
  try {
    const blogsFound = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })

    blogsFound.forEach((blogFound) => {
      const { author, title, likes } = blogFound
      console.log(`${author}: '${title}', ${likes} likes`)
    });

    sequelize.close()
  } catch (error) {
    console.error('Details: ', error)
  }
}

cli()