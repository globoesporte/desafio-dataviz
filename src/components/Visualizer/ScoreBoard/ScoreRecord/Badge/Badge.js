import styled from 'styled-components'

export const Badge = styled.div`
  display: inline;
  background-color: ${props => props.backgroundColor || 'black'};
  padding: 3px 5px 3px 5px;
  color: white;
  border-radius: 20px 0 0 20px;
  margin: 1px;
`
