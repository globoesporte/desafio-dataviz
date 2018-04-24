import { HSV } from '../HSV/HSV'

export const GradientGenerator = {
  generate: function ({
    from,
    to,
    steps
  }) {
    const colors = []
    const hueStep = (to.hue - from.hue) / steps
    const saturationStep = (to.saturation - from.saturation) / steps
    const valueStep = (to.value - from.value) / steps
    let counter = 0

    while (counter <= steps) {
      colors.push(
        new HSV({
          hue: from.hue + hueStep * counter,
          saturation: from.saturation + saturationStep * counter,
          value: from.value + valueStep * counter
        }))

      counter += 1
    }

    return colors
  }
}
