import moment from 'moment'

export function formatDate (v) {
  if (v) {
    return moment(v).format('MM/DD/YYYY')
  }
}

export function formatDateFromNow (v) {
  if (v) {
    let m = moment(v)
    let now = moment()

    if (m.isAfter(now.subtract(2, 'days'))) {
      return m.fromNow()
    } else if (m.isAfter(now.subtract(30, 'days'))) {
      return m.format('MMMM D')
    } else {
      return m.format('MM/DD/YYYY')
    }
  }
}
