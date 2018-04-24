import React, { Component } from 'react'
import { Badge } from './Badge/Badge'

export class ScoreRecord extends Component {
  render () {
    return (
      <Badge backgroundColor={this.props.badgeColor}>
        {this.props.record.year}
      </Badge>
    )
  }
}
