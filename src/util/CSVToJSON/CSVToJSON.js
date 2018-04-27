export function CSVToJSON (CSV) {
  const lines = CSV.split('\n')
  const header = lines.shift().replace('\r', '').split('\t')
  const data = lines
    .map(line => line.replace('\r', ''))
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
