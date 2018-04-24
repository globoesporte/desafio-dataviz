import { hsvToRgb } from '../ColorConversion/hsvToRgb'

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
    return hsvToRgb(this.hue, this.saturation, this.value)
  }
}
