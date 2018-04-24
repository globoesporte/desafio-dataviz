import React, { Component } from 'react'
import styled from 'styled-components'
import { Material } from '../Material/Material'
import { RecordsRepository } from '../../repository/RecordsRepository'
import { Circle } from '../Circle/Circle'
import { Row } from '../Row/Row'
import { GradientGenerator } from '../../util/GradientGenerator/GradientGenerator'
import { HSV } from '../../util/HSV/HSV'
import Anime from 'react-anime'

export class Visualizer extends Component {
  constructor () {
    super()
    this.state = {
      records: undefined,
      colors: undefined
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
    const ANIMATION_REVEAL_DURATION = 800
    const ANIMATION_REVEAL_DELAY = 200
    const ANIMATION_EASING = 'easeInOutQuad'
    const ANIMATION_RUN_EASING = 'easeInQuad'
    const ANIMATION_RUN_DURATION_FACTOR = 1200
    const ANIMATION_RUN_AMOUNT = 600

    return (

      <Material>
        {
          this.state.records
            ? <Row>
              <Anime
                easing={ANIMATION_EASING}
                duration={ANIMATION_REVEAL_DURATION}
                translateY={[-100, 0]}
                delay={(el, i) => i * ANIMATION_REVEAL_DELAY}
                complete={() => console.log('complete')}
                ref={ref => this.animations.push(ref.anime)}>

                {this.state.records.map((record, index) =>
                  <div key={record.id}>
                    <Anime
                      easing={ANIMATION_RUN_EASING}
                      delay={this.state.records.length * ANIMATION_REVEAL_DELAY + ANIMATION_REVEAL_DURATION}
                      translateY={[0, ANIMATION_RUN_AMOUNT]}
                      duration={record.mark * ANIMATION_RUN_DURATION_FACTOR}
                      complete={() => console.log(record)}
                      ref={ref => {
                        // console.log(record.mark * ANIMATION_RUN_DURATION_FACTOR)
                        this.animations.push(ref.anime)
                      }}>
                      <div
                        style={{ position: 'relative' }}>
                        <Circle size='15px' color={this.state.colors.next().value.toRGB()} />
                        <Anime
                          easing={ANIMATION_EASING}
                          duration={300}
                          opacity={[1, 0]}
                          delay={() => index * ANIMATION_REVEAL_DELAY + ANIMATION_REVEAL_DURATION}
                          ref={ref => this.animations.push(ref.anime)}>
                          <div>
                            <FloatingText>{record.year}</FloatingText>
                          </div>
                        </Anime>
                      </div>
                    </Anime>
                  </div>
                )}
              </Anime>
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
