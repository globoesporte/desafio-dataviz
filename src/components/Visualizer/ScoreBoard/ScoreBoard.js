import React, { Component } from 'react'
import { Material } from '../../Material/Material'
import { ScoreRecord } from './ScoreRecord/ScoreRecord'

export class ScoreBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      board: []
    }
  }

  createBoard (records, colors) {
    const board = records.map((record, index) => {
      return {
        record,
        badgeColor: colors[index]
      }
    }).sort((a, b) => a.record.mark - b.record.mark)

    this.setState({ board })
  }

  componentDidMount () {
    this.createBoard(this.props.records, this.props.colors)
  }

  render () {
    return (
      <Material
        backgroundColor='transparent'
        style={{display: 'table', width: '100%'}}>
        {this.state.board
          .filter((relation, index) => {
            if (index < this.props.maxRecordsToShow) return relation
          })
          .map((relation, index) => {
            return <ScoreRecord
              key={relation.record.id}
              record={relation.record}
              badgeColor={relation.badgeColor} />
          }
        )}
      </Material>
    )
  }
}
