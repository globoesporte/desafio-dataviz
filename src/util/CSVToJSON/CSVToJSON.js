export function CSVToJSON (CSV) {
  const lines = CSV.split('\r\n')
  const header = lines.shift().split('\t')
  const data = lines
    .map(line => {
      const object = {}
      line
        .split('\t')
        .forEach((entry, index) => {
          object[header[index]] = entry
        })

      return object
    })
  return data
}
