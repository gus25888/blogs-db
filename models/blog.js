const { sequelize } = require('../util/db')
const { DataTypes, Model } = require('sequelize')

class Blog extends Model { }

const minYear = 1991
const maxYear = new Date().getUTCFullYear()

Blog.init({
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
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: minYear,
        msg: `Year must be ${minYear} or later`
      },
      max: {
        args: maxYear,
        msg: `Year must be the current year (${maxYear}) or earlier`
      },
      notNull: {
        msg: `Year must be between ${minYear} and ${maxYear}`
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blogs',
},);

module.exports = Blog