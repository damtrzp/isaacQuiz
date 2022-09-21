import React, { Component } from 'react'
import LoadingWheel from './LoadingWheel/LoadingWheel';
import "./LoadingWheel/loading.css"

export default class StartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          questionsAmount: 15
        };

        this.changeQuestionsAmount = this.changeQuestionsAmount.bind(this);
    }
    changeQuestionsAmount(e) {
      this.setState({
        questionsAmount: Number(e.target.value)
      })
    }
  render() {
    return (
        <>
        <header>The Binding of Isaac Quiz</header>

        <section style={{
          fontSize: "5vmin",
          marginTop: "7.5vmin"
        }} onChange={this.changeQuestionsAmount}>
          <span>Number of questions: </span>
          <input type="radio" value="10" id="10" name="qNumber"></input> <label htmlFor="10">10</label>
          <input type="radio" value="15" id="15" name="qNumber" defaultChecked></input> <label htmlFor="15">15</label>
          <input type="radio" value="20" id="20" name="qNumber"></input> <label htmlFor="20">20</label>
          <input type="radio" value="30" id="30" name="qNumber"></input> <label htmlFor="30">30</label>
        </section>
        {
        this.props.loading ?
        <LoadingWheel></LoadingWheel>
        :
        <button value="Start" onClick={() => this.props.startFunc(this.state.questionsAmount)} style={{
          marginTop: "10vmin"
        }}>Start</button>
        }
        </>
    )
  }
}
