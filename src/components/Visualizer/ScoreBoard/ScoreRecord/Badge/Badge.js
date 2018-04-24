import styled from 'styled-components'

export const Badge = styled.div`
  background-color: ${props => props.backgroundColor || 'black'};
  padding: 2px 5px 2px 5px;
  color: white;
  border-radius: 20px 0 0 20px
  margin: 1px;
`
