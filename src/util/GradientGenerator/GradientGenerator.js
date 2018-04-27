import { HSV } from '../HSV/HSV'

function _getHSVSteps ({
  from,
  to,
  steps
}) {
  const hueStep = (to.hue - from.hue) / steps
  const saturationStep = (to.saturation - from.saturation) / steps
  const valueStep = (to.value - from.value) / steps

  return {
    hueStep,
    saturationStep,
    valueStep
  }
}

function _getNextHSV ({
  from,
  HSVSteps,
  step
}) {
  return new HSV({
    hue: from.hue + HSVSteps.hueStep * step,
    saturation: from.saturation + HSVSteps.saturationStep * step,
    value: from.value + HSVSteps.valueStep * step
  })
}

export const GradientGenerator = {
  generate ({
    from,
    to,
    steps
  }) {
    const colors = []
    const HSVSteps = _getHSVSteps({from, to, steps})
    let step = 0

    while (step <= steps) {
      colors.push(_getNextHSV({
        from,
        HSVSteps,
        step
      }))

      step += 1
    }

    return colors
  },
  buildGenerator: function ({
    from,
    to,
    steps
  }) {
    const HSVSteps = _getHSVSteps({from, to, steps})

    return (function * () {
      let step = 0

      while (step <= steps) {
        yield _getNextHSV({
          from,
          HSVSteps,
          step: step
        })
        step++
      }
    })()
  }
}
