import React, { Component } from 'react'
import { Material } from '../../Material/Material'
import { ScoreRecord } from './ScoreRecord/ScoreRecord'
import { keyframes } from 'styled-components'
import { Animation, PlayState } from '../../Animation/Animation'

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

  getPlayState (index) {
    if (this.props.playState === PlayState.running) {
      return index < this.props.maxRecordsToShow ? PlayState.running : PlayState.paused
    }
    return this.props.playState
  }

  render () {
    return (
      <Material
        backgroundColor='transparent'
        style={{display: 'table', width: '100%'}}>
        {this.state.board
          .map((relation, index) => {
            // TODO: Do not rely on React to animate this properly. The setState method is async and will not
            // update the animation on the correct timing
            return <FadeInAnimation
              delay={0}
              duration={0.3}
              key={relation.record.id}
              playState={() => this.getPlayState(index)}>
              <ScoreRecord
                record={relation.record}
                badgeColor={relation.badgeColor} />
            </FadeInAnimation>
          }
        )}
      </Material>
    )
  }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const FadeInAnimation = Animation.extend`
  animation-name: ${fadeIn};
  display: table-row;
`
