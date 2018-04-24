import { CompetitionRecord } from '../model/CompetitionRecord'
import { CSVToJSON } from '../util/CSVToJSON/CSVToJSON'
// import Data from '../../data/data.tsv'

class _RecordsRepository {
  getRecords () {
    if (this.data === undefined) {
      /* global fetch */
      return fetch('data/data.tsv')
        .then(response => response.text())
        .then(csv => {
          // console.log(csv)
          const rawData = CSVToJSON(csv)
          console.log(rawData)

          this.data = rawData.map(record => new CompetitionRecord({
            year: record.ano,
            country: record.pais,
            countryAbbreviation: record.sigla,
            event: record.evento,
            gender: record.sexo,
            mark: record.marca,
            athleteName: record.atletas
          }))
          console.log(this.data)
          return this.data
        })
    }
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }
}

export const RecordsRepository = new _RecordsRepository()
