module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addConstraint('reading_lists', {
      fields: ['blog_id', 'user_id'],
      type: 'unique',
      name: 'blog_user_unique_constraint'
    }
    )
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('reading_lists', 'blog_user_unique_constraint')
  },
}