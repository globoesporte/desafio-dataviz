import React, { Component } from 'react'
import { Row } from '../../Row/Row'
import { Button } from '../../Button/Button'

export class Controls extends Component {
  render () {
    return (
      <Row>
        <Button onClick={() => this.props.onPlay()}>Play</Button>
        <Button onClick={() => this.props.onPause()}>Pause</Button>
        <Button onClick={() => this.props.onReset()}>Reset</Button>
      </Row>
    )
  }
}
