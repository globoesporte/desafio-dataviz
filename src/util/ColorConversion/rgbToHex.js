// Shamelessly copied from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

export function rgbToHex (r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
