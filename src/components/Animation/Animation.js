import styled from 'styled-components'

export const Animation = styled.div`
  animation-duration: ${props => (props.duration || '0.8') + 's'};
  animation-delay: ${props => (props.delay || '0') + 's'};
  animation-timing-function: ${props => props.easing || 'ease-in-out'};
  animation-play-state: ${props => props.playState || PlayState.running};
  animation-fill-mode: forwards;
`
export const PlayState = {
  running: 'running',
  paused: 'paused',
  initial: 'initial'
}
