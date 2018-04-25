import { CompetitionRecord } from '../model/CompetitionRecord'
import { CSVToJSON } from '../util/CSVToJSON/CSVToJSON'
import { toAlpha2 } from '../util/CountryAbbreviation/CountryAbbreviation'

class _RecordsRepository {
  getRecords () {
    if (this.data === undefined) {
      /* global fetch */
      return fetch('data/data.tsv')
        .then(response => response.text())
        .then(csv => {
          const rawData = CSVToJSON(csv)

          this.data = rawData.map(record => new CompetitionRecord({
            year: record.ano,
            country: record.pais,
            countryAbbreviation: record.sigla,
            countryAbbreviationAlpha2: toAlpha2(record.sigla),
            event: record.evento,
            gender: record.sexo,
            mark: parseFloat(record.marca),
            athleteName: record.atletas
          }))
          return this.data
        })
    }
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }
}

export const RecordsRepository = new _RecordsRepository()
