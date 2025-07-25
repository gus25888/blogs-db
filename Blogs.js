require('dotenv').config()
const { DataTypes, Model, Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blogs extends Model { }

Blogs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: { type: DataTypes.TEXT },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blogs',
},);

Blogs.sync()

module.exports = Blogs