import React, { Component } from 'react'
import styled from 'styled-components'
import { Badge } from './Badge/Badge'
import { Colors } from '../../../../theme/Colors'

export class ScoreRecord extends Component {
  render () {
    return (
      <Record>
        <Group>
          <Badge backgroundColor={this.props.badgeColor}>
            {this.props.record.year}
          </Badge>
          <Text uppercase>{this.props.record.athleteName}</Text>
        </Group>
        <Group>
          <div className={`flag-icon flag-icon-${this.props.record.countryAbbreviationAlpha2.toLowerCase()}`} />
          <Text uppercase>{this.props.record.countryAbbreviation}</Text>
        </Group>
        <Group textAlign={'right'}>
          {/* TODO: Add right pad so the mark is always with 2 decimal places */}
          <Text>{(this.props.record.mark + 's').replace('.', ',')}</Text>
        </Group>
      </Record>
    )
  }
}

const Record = styled.div`
  width: 100%;
  display: contents;
  padding: 0px;
  background-color: rgba(255, 255, 255, 0.8);
`

const Group = styled.div`
  display: table-cell;
  padding: 3px 0px 3px 0px;
  text-align: ${props => props.textAlign || 'left'};
  border-top: 2px dashed ${Colors.gray6};
  * {
    display: inline;
  }
`

const Text = styled.h4`
  text-transform: ${props => props.uppercase ? 'uppercase' : 'initial'};
  font-weight: 300;
  padding-left: 6px;
  margin: 0;
`
