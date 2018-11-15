function email (message = 'Email must be valid') {
  return v => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || message
}

function maxLength (count, message) {
  message = message || `Max ${count} characters`
  return v => (!v || v.length <= count) || message
}

function required (message = 'Required') {
  return v => !!v || message
}

export default {
  email,
  maxLength,
  required
}
