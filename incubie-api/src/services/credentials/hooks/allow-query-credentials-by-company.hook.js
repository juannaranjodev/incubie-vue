const { checkContext } = require('feathers-hooks-common')
const get = require('lodash/get')
const set = require('lodash/set')

module.exports = (options = {}) => async function allowQueryCredentialsByCompany (context) {
  checkContext(context, 'before', ['find'])

  const { app, params } = context
  const company = params.query.company

  if (company) {
    const boards = await app.service('boards').find({
      query: {
        company,
        $select: ['_id']
      },
      paginate: false
    })

    const entityIds = boards.map(board => board._id)
    const $in = get(params.query, 'entity.$in', [])
    set(context.params.query, 'entity.$in', $in.concat(company).concat(entityIds))

    context.params.company = context.params.query.company
    delete context.params.query.company
  }
}
