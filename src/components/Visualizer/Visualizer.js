import React, { Component } from 'react'
// import styled from 'styled-components'
import { Material } from '../Material/Material'
import { RecordsRepository } from '../../repository/RecordsRepository'
import { Circle } from '../Circle/Circle'
import { Row } from '../Row/Row'
import { GradientGenerator } from '../../util/GradientGenerator/GradientGenerator'
import { HSV } from '../../util/HSV/HSV'

export class Visualizer extends Component {
  constructor () {
    super()
    this.state = {
      records: undefined,
      colors: undefined
    }
  }

  componentWillMount () {
    RecordsRepository
      .getRecords()
      .then(records => records.filter(record => record.gender === 'M'))
      .then(records => {
        this.setState({
          colors: GradientGenerator.buildGenerator({
            from: new HSV({
              hue: 0.6,
              saturation: 1,
              value: 1
            }),
            to: new HSV({
              hue: 0,
              saturation: 1,
              value: 0.5
            }),
            steps: records.length
          })
        })

        return records
      })
      // .then(records => {
      //   console.log(records)
      //   return records
      // })
      .then(records => this.setState({ records }))
  }

  render () {
    return (
      <Material>
        {
          this.state.records
            ? <Row>
              {this.state.records.map(record =>
                <div key={record.id}>
                  <Circle size='15px' color={this.state.colors.next().value.toRGB()} />
                  {/* <p>{record.year}</p> */}
                </div>
              )}
            </Row>
            : <h3>Loading...</h3>
        }
      </Material>
    )
  }
}
