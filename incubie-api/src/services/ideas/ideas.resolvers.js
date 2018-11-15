module.exports = {
  joins: {
    // board: () => async (idea, context) => {
    //   const { app } = context
    //   idea.board = await app.service('boards').get(idea.board)
    // },
    votes: () => async (idea, context) => {
      const { app } = context
      const votes = await app.service('votes').find({
        query: {
          parent: idea._id,
          $select: ['voter']
        },
        paginate: false
      })

      idea.votes = votes
    },
    commentCount: () => async (idea, context) => {
      const { app } = context
      const { total } = await app.service('comments').find({
        query: {
          idea: idea._id,
          $limit: 0
        }
      })

      idea.commentCount = total
    }
  }
}
