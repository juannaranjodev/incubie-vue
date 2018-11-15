const mjml2html = require('mjml')
const glob = require('glob')
const fs = require('fs')
const del = require('del')
const path = require('path')

const templatesDir = path.join(__dirname, 'src')
const watch = (path, opt, fn) => {
  let lock = false
  fs.watch(path, opt, function () {
    if (!lock) {
      lock = true
      fn()
      setTimeout(() => {
        lock = false
      }, 1000)
    }
  })
}

function parseHrtimeToMs (hrtime) {
  return (hrtime[0] + (hrtime[1] / 1e6)).toFixed(3) + 'ms'
}

function compileMjml () {
  const startTime = process.hrtime()
  del.sync(path.join(__dirname, 'dist'))
  fs.mkdirSync(path.join(__dirname, 'dist'))

  const files = glob.sync(`${templatesDir}/**/*.mjml`)

  files.forEach(file => {
    const mjml = fs.readFileSync(file, 'utf8')
    const html = mjml2html(mjml, {
      beautify: true
    }).html
    const name = path.basename(file, '.mjml')
    const dest = path.join(__dirname, 'dist', name + '.html')

    fs.writeFileSync(dest, html, 'utf8')
  })

  let compileTime = parseHrtimeToMs(process.hrtime(startTime))
  console.log(`Compiled ${files.length} mjml file(s) in ${compileTime}.`)
}

compileMjml()

watch(templatesDir, { interval: 500 }, function () {
  compileMjml()
})
