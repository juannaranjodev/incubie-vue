const errors = require('@feathersjs/errors')

module.exports = {
  joins: {
    ideasCount: () => async (company, { app, params }) => {
      const { total } = await app.service('ideas').find({
        query: {
          company: company._id,
          $limit: 0
        }
      })

      company.ideasCount = total
    }
  }
}
