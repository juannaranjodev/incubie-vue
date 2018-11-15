module.exports = (options = {}) => async function allowQueryCommentsByRepliesToHook (context) {
  const { params } = context
  const { $replies } = params.query

  console.log($replies)

  if ($replies) {
    context.params.$replies = $replies
    delete context.params.query.$replies
  }
  // console.log(context.params.$replies)
}
