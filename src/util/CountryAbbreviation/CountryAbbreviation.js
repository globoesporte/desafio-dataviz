const alpha3ToAlpha2 = {
  AUS: 'AU',
  BLR: 'BY',
  CAN: 'CA',
  EUA: 'DE',
  FRG: 'DE',
  GBR: 'GB',
  GDR: 'DD',
  GRE: 'GR',
  JAM: 'JM',
  NED: 'NL',
  POL: 'PL',
  RSA: 'ZA',
  TTO: 'TT',
  URS: 'SU',
  USA: 'US'
}

export function toAlpha2 (alpha3) {
  console.log(`${alpha3} - ${alpha3ToAlpha2[alpha3]}`)
  return alpha3ToAlpha2[alpha3] || ''
}
