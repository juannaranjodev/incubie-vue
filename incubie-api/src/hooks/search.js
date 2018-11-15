
/**
 * Adds " around `str` and removes any " in `str`.
 * @param {string} str
 */
function escape (str) {
  return '"' + str.replace(/"/g, '') + '"'
}

/**
 * Escapes characters in the string that are not safe to use in a RegExp.
 * @param {*} s The string to escape. If not a string,
 *              it will be casted to one.
 * @return {string} A RegExp safe, escaped copy of {@code s}.
 * from https://github.com/google/closure-library/blob/master/closure/goog/string/string.js#L1148
 */
function regExpEscape (s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08')
}

function prepareQuery(query, params) {
  if(params.fields) {
    for(let i in params.fields) {
      let field = params.fields[i]

      if(params.fields.indexOf(field) < 0) {
        continue
      }

      if(query[field] && typeof query[field] == 'object' && query[field].hasOwnProperty('$search')) {
        if(query[field].$search == '') {
          delete query[field]
        }
        else {
          let search = regExpEscape(query[field].$search || '')

          let values = search.trim().split(' ')

          delete query[field].$search
          query[field].$regex = new RegExp(values.join('|'), 'i')
        }
      }
    }
  }

  if(query.$or) {
    for(let i in query.$or) {
      prepareQuery(query.$or[i], params)
    }
  }
}

module.exports = (params) => {
  return (hook) => {
    const query = hook.params.query

    prepareQuery(query, params)
  }
}