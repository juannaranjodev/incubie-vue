function smoothScrollTo (endX, endY, duration) {
  let startX = window.scrollX || window.pageXOffset
  let startY = window.scrollY || window.pageYOffset
  let distanceX = endX - startX
  let distanceY = endY - startY
  let startTime = new Date().getTime()

  duration = typeof duration !== 'undefined' ? duration : 400

  // Easing function
  const easeInOutQuart = function (time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from
  }

  const timer = window.setInterval(function () {
    let time = new Date().getTime() - startTime
    let newX = easeInOutQuart(time, startX, distanceX, duration)
    let newY = easeInOutQuart(time, startY, distanceY, duration)

    if (time >= duration) {
      window.clearInterval(timer)
    }
    window.scrollTo(newX, newY)
  }, 1000 / 60) // 60 fps
}

export default {
  methods: {
    scrollToTarget (target, opts = {}) {
      const { offset = 0, duration = 400 } = opts
      const element = document.querySelector(target)

      if (!element) {
        throw new Error(`scrollToElement: target ${target} does not exist in the document.`)
      }

      const { top } = element.getBoundingClientRect()
      smoothScrollTo(0, top + offset, duration)
    }
  }
}
