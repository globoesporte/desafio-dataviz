import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
// import { GradientGenerator } from './util/GradientGenerator/GradientGenerator';
// import { HSV } from './util/HSV/HSV';
// // import { RecordsRepository } from './repository/RecordsRepository'
// const colors = GradientGenerator.generate({
//   from: new HSV({
//     hue: 0,
//     saturation: 0,
//     value: 0
//   }),
//   to: new HSV({
//     hue: 100,
//     saturation: 255,
//     value: 100
//   }),
//   steps: 3
// })
class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
