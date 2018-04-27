import { hsvToRgb } from '../ColorConversion/hsvToRgb'
import { rgbToHex } from '../ColorConversion/rgbToHex'

export class HSV {
  constructor ({
    hue,
    saturation,
    value
  }) {
    this.hue = hue
    this.saturation = saturation
    this.value = value
  }

  toRGB () {
    const [r, g, b] = hsvToRgb(this.hue, this.saturation, this.value)
    return rgbToHex(
      Math.floor(r),
      Math.floor(g),
      Math.floor(b)
    )
  }
}
