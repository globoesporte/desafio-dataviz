import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import uuidv1 from 'uuid/v1'

import { Material } from '../Material/Material'
import { RecordsRepository } from '../../repository/RecordsRepository'
import { Circle } from '../Circle/Circle'
import { Row } from '../Row/Row'
import { GradientGenerator } from '../../util/GradientGenerator/GradientGenerator'
import { HSV } from '../../util/HSV/HSV'
import { ScoreBoard } from './ScoreBoard/ScoreBoard'
import { Animation, PlayState } from '../Animation/Animation'
import { Controls } from './Controls/Controls'

export class Visualizer extends Component {
  constructor () {
    super()
    this.state = {
      records: undefined,
      colors: undefined,
      maxRecordsToShowOnBoard: 0,
      scoreBoard: undefined,
      playState: PlayState.running,
      uniqueKey: uuidv1()
    }
    this.animations = []
  }

  setupRecords () {
    RecordsRepository
    .getRecords()
    .then(records => records.filter(record => record.gender === 'M'))
    .then(records => {
      const colors = GradientGenerator
          .generate({
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
          .map(hsv => hsv.toRGB())

      this.setState({
        colors
      })

      return {
        records,
        colors
      }
    })
    .then(recordAndColors => this.setState({ records: recordAndColors.records }))
  }

  componentWillMount () {
    this.setupRecords()
  }

  render () {
    const ANIMATION_REVEAL_DURATION = 0.8
    const ANIMATION_REVEAL_DELAY = 0.2
    const ANIMATION_FADE_DURATION = 0.2
    const ANIMATION_RUN_DURATION_FACTOR = 0.5
    const CIRCLE_SIZE = 15
    const CIRCLE_MARGIN = 2

    return (
      <Material>
        {
          this.state.records
            ? <Row>
              <FloatingContainer
                width={this.state.records.length * (CIRCLE_SIZE + CIRCLE_MARGIN * 2) + 'px'}>
                <ScoreBoard
                  key={this.state.uniqueKey}
                  playState={this.state.playState}
                  records={this.state.records}
                  colors={this.state.colors}
                  // maxRecordsToShow={100}
                  maxRecordsToShow={this.state.maxRecordsToShowOnBoard}
                  />
              </FloatingContainer>

              {this.state.records.map((record, index) =>

                <RevealAnimation
                  key={record.id}
                  playState={this.state.playState}
                  from={'-100px'}
                  to={'0px'}
                  duration={ANIMATION_REVEAL_DURATION}
                  delay={index * ANIMATION_REVEAL_DELAY}>
                  <RunAnimation
                    playState={this.state.playState}
                    runAmount={'90vh'}
                    onAnimationEnd={() => this.setState({ maxRecordsToShowOnBoard: this.state.maxRecordsToShowOnBoard + 1 })}
                    delay={this.state.records.length * ANIMATION_REVEAL_DELAY + ANIMATION_REVEAL_DURATION}
                    duration={record.mark * ANIMATION_RUN_DURATION_FACTOR}
                    easing='ease-in'>

                    <div
                      style={{ position: 'relative' }}>
                      <Circle
                        size={`${CIRCLE_SIZE}px`}
                        margin={`${CIRCLE_MARGIN}px`}
                        color={this.state.colors[index]} />
                      <FadeAnimation
                        playState={this.state.playState}
                        duration={ANIMATION_FADE_DURATION}
                        delay={index * ANIMATION_REVEAL_DELAY + ANIMATION_REVEAL_DURATION}
                        onAnimationEnd={(e) => e.stopPropagation()}>

                        <FloatingText>{record.year}</FloatingText>
                      </FadeAnimation>
                    </div>
                  </RunAnimation>
                </RevealAnimation>
              )}
              <Controls
                onPlay={() => this.setState({ playState: PlayState.running })}
                onPause={() => this.setState({ playState: PlayState.paused })}
                onReset={() => {
                  /**
                   * Ugly hack to restart the application.
                   * The correct way was not working as expected and I've been coding
                   * for 11 hours without stopping. This will do for the sake of this project
                   */
                  window.location.reload()
                  // this.setState({ uniqueKey: uuidv1() })
                  // this.setState({ records: [] }, () => this.setupRecords())
                  // this.setState({ maxRecordsToShowOnBoard: 0 })
                }}
              />
            </Row>
            : <h3>Loading...</h3>
        }
      </Material>
    )
  }
}

const FloatingText = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const FloatingContainer = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  max-width: ${props => props.width};
`

function translateBuilder (from, to) {
  return keyframes`
    from {
      transform: translateY(${from || '0px'});
    }
    to {
      transform: translateY(${to || '0px'});
    }
  `
}

const RevealAnimation = Animation.extend`
  animation-name: ${props => translateBuilder(props.from, props.to)};
  transform: ${props => `translateY(${props.from})`};
`

const fade = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

const FadeAnimation = Animation.extend`
  animation-name: ${fade};
`

const RunAnimation = Animation.extend`
  animation-name: ${props => translateBuilder('0px', props.runAmount)};
`
