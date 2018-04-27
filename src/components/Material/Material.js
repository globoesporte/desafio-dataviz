import styled from 'styled-components'
import {BaseTheme} from '../../theme/BaseTheme'

export const Material = styled.div`
  position: relative;
  display: block;
  background-color: ${props => props.backgroundColor || BaseTheme.backgroundColor};
  color: ${BaseTheme.textColor};
  padding: 16px;
`
