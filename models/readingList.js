const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model { }

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: 'blog_user_unique_constraint',
    references: { model: 'blogs', key: 'id' },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: 'blog_user_unique_constraint',
    references: { model: 'user', key: 'id' },
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reading_lists',
},);

module.exports = ReadingList