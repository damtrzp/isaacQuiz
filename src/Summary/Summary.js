import React, { Component } from 'react'
import SummarySection from './SummarySection';

export default class Summary extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div id="summary">
        <header>Summary</header>
        
        {this.props.summary.map((el) => {
          return (
            <SummarySection
            label={el.questionType}
            correctAnswers={el.correctAnswers}
            totalAnswers={el.totalAnswers}
            ></SummarySection>
          )
        })}

        
        </div>
    )
  }
}
