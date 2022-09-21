import React, { Component } from 'react'
import Quiz from './Quiz/Quiz.js'
export default class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <>
          <Quiz></Quiz>
        </>
      </React.StrictMode>
    )
  }
}