import styled from 'styled-components'

export const Circle = styled.div`
  position: relative;
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  margin: 2px;
  background-color: ${props => props.color || 'black'};
  border-radius: 50%;
`
