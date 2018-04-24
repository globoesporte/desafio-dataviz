import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import { Material } from '../Material/Material'
import { RecordsRepository } from '../../repository/RecordsRepository'
import { Circle } from '../Circle/Circle'
import { Row } from '../Row/Row'
import { GradientGenerator } from '../../util/GradientGenerator/GradientGenerator'
import { HSV } from '../../util/HSV/HSV'
import { ScoreBoard } from './ScoreBoard/ScoreBoard'

const PlayState = {
  running: 'running',
  paused: 'paused'
}

export class Visualizer extends Component {
  constructor () {
    super()
    this.state = {
      records: undefined,
      colors: undefined,
      maxRecordsToShowOnBoard: 0,
      scoreBoard: undefined,
      playState: PlayState.running
    }
    this.animations = []
  }

  // componentDidMount () {
  //   setInterval(() => {
  //     this.animations.forEach(animation => animation.pause())
  //     setTimeout(() => {
  //       this.animations.forEach(animation => animation.play())
  //     }, 400)
  //   }, 1000)
  // }

  componentWillMount () {
    this.animations = []

    RecordsRepository
      .getRecords()
      // .then(records => records.filter((value, index) => {
      //   if (index < 15 && index > 8) return value
      // }))
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
      // .then(records => {
      //   console.log(records)
      //   return records
      // })
      .then(recordAndColors => this.setState({ records: recordAndColors.records }))
  }

  render () {
    const ANIMATION_REVEAL_DURATION = 0.8
    const ANIMATION_REVEAL_DELAY = 0.2
    const ANIMATION_FADE_DURATION = 0.2
    const ANIMATION_RUN_DURATION_FACTOR = 0.5

    return (
      <Material>
        {
          this.state.records
            ? <Row>
              <FloatingContainer>
                <ScoreBoard
                  records={this.state.records}
                  colors={this.state.colors}
                  maxRecordsToShow={this.state.maxRecordsToShowOnBoard} />
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
                    runAmount={'80vh'}
                    onAnimationEnd={() => this.setState({ maxRecordsToShowOnBoard: this.state.maxRecordsToShowOnBoard + 1 })}
                    delay={this.state.records.length * ANIMATION_REVEAL_DELAY + ANIMATION_REVEAL_DURATION}
                    duration={record.mark * ANIMATION_RUN_DURATION_FACTOR}
                    easing='ease-in'>

                    <div
                      style={{ position: 'relative' }}>
                      <Circle size='15px' color={this.state.colors[index]} />
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
`

const Animation = styled.div`
  animation-duration: ${props => (props.duration || '0.8') + 's'};
  animation-delay: ${props => (props.delay || '0') + 's'};
  animation-timing-function: ${props => props.easing || 'ease-in-out'};
  animation-play-state: ${props => props.playState || 'running'};
  animation-fill-mode: forwards;
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
