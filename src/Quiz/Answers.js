import React, { Component } from 'react'

export default class Answers extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.answer = this.answer.bind(this);
        this.props.answers.forEach((el, i) => {
            if(el == this.props.correctAnswer) this.state.correctAnswerIndex = i;
        });
    }
    // Checks if the answer is correct, colors the wrong and correct answers by referencing them by their index in the array/map
    answer(selectedAns, index) {
        // Set the correct answer index
        this.props.answers.forEach((el, i) => {
            if(el == this.props.correctAnswer) this.state.correctAnswerIndex = i;
        });
        // Color the correct and wrong answer
        if(selectedAns == this.props.correctAnswer) {
            this.setState({
                correctSelectedIndex: this.state.correctAnswerIndex
            })
            this.props.answerFunc(true);
        }
        else {
            this.setState({
                wrongSelectedIndex: index,
                correctSelectedIndex: this.state.correctAnswerIndex
            })
            this.props.answerFunc(false);
        }
        // Reset the coloring after the fade out
        setTimeout(() => {
            this.setState({
                wrongSelectedIndex: null,
                correctSelectedIndex: null
            })
        }, 700)
    }
    render() {
        let answers = this.props.answers.map((el, i) => {
            let className = "";
            if(this.state.correctSelectedIndex == i)
                className = "correct"
            if(this.state.wrongSelectedIndex == i)
                className = "wrong"
        
            return (
                <button
                key={el}
                onClick={() => this.answer(el, i)}
                className={`${className} answerButton` }
                >{el}</button>
            )
        })
        return (
            <div id="answers">
                <div>
                    {answers[0]}
                    {answers[1]}
                </div>
                <div>
                    {answers[2]}
                    {answers[3]}
                </div>
                <div>
                    {[...answers.splice(4)]}
                </div>
            </div>
        )
  }
}
