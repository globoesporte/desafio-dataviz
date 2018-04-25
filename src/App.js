import React, { Component } from 'react'
import './App.css'
import { Visualizer } from './components/Visualizer/Visualizer'
import { Center } from './components/Center/Center'

class App extends Component {
  render () {
    return (
      <Center>
        <Visualizer />
      </Center>
    )
  }
}

export default App
