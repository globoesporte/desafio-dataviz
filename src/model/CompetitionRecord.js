import uuidv1 from 'uuid/v1'

export class CompetitionRecord {
  constructor ({
    year,
    country,
    countryAbbreviation,
    countryAbbreviationAlpha2,
    event,
    gender,
    mark,
    athleteName
  }) {
    this.id = uuidv1()
    this.year = year
    this.country = country
    this.countryAbbreviation = countryAbbreviation
    this.countryAbbreviationAlpha2 = countryAbbreviationAlpha2
    this.event = event
    this.gender = gender
    this.mark = mark
    this.athleteName = athleteName
  }
}
