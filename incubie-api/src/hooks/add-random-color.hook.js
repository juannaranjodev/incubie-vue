const colors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'blue-grey'
]

module.exports = (options = {}) => hook => {
  const color = colors[Math.floor(colors.length * Math.random())]
  hook.data.color = color
}
