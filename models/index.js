const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'reading' })
Blog.belongsToMany(User, { through: ReadingList, as: 'user_selection' })

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog, ReadingList, Session, User
}