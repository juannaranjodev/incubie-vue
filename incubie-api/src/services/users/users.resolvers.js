const entityKinds = require('../credentials/entity-kinds') // ruby test

module.exports = {
  joins: {
    credentials: () => async (user, { app }) => {
      const credentials = await app.service('credentials').find({
        query: {
          user: user._id
        },
        paginate: false
      })

      user.credentials = credentials
    },
    // ruby test < to get count of ideas whose createdBy = user's id
    ideasCount: () => async (user, { app, params }) => {
      const { total } = await app.service('ideas').find({
        query: {
          createdBy: user._id,
          $limit: 0
        }
      })

      user.ideasCount = total
    },

    // role: () => async (user, { app }) => {
    //   const credentials = await app.service('credentials').find({
    //     query: {
    //       user: user._id,
    //       kind: entityKinds.companies,
    //     },
    //     paginate: false
    //   })

    //   user.role = credentials ? credentials[0].role : 'member';
    // },
    // ruby test >
  }
}
