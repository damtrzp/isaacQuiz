import React, { Component } from 'react'
import {QualityQuestion} from './Questions/questionsComponents.js';
import QualityQuestionData from './quizData.js';
import QuestionType from './enum.js';
import {generateQuestion, generateMultipleQuestions} from './generateQuestion.js';
import Answers from './Answers.js';
import StartView from '../StartView.js';
import Summary from '../Summary/Summary.js';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizStarted: false,
      currentQuestion: 0,
      questions: [],
      loading: false
    };
    
    this.startFunc = this.startFunc.bind(this);
    this.answer = this.answer.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
    
  }
  startFunc(questionsAmount = 15) {
    // Start the loading animation
    this.setState({loading: true});
    // Generate the questions
    generateMultipleQuestions(questionsAmount).then(questions => {
      console.log(questions)
      this.setState({
        loading: false,
        quizStarted: true,
        quizFinished: false,
        questions: questions
      })
      console.log(this.state.questions)
    })
  }
  answer(correct) {
    if(correct) {
      // Add an answered correctly flag to the current question
        let newQuestions = [...this.state.questions];
        newQuestions[this.state.currentQuestion].answeredCorrectly = true;
        this.setState({
          questions: newQuestions
        })
    }
  // Move to the next question, fade out and in
  // Similiar function in Answers Component
  const fadeDelay = 500;
  const totalDelay = fadeDelay + 700;
  document.getElementById("quiz").style.pointerEvents = "none";
    setTimeout(() => {
      document.getElementById("quiz").style.opacity = 0;
    }, fadeDelay);
    
    setTimeout(() => {
      if(!this.state.questions[this.state.currentQuestion + 1]) {
        this.endQuiz();
      }
      else {
        this.setState({
          currentQuestion: this.state.currentQuestion + 1
        });
      }
      document.getElementById("quiz").style.opacity = "100%";
      document.getElementById("quiz").style.pointerEvents = "auto";
      
    }, totalDelay)
    
  }
  endQuiz() {
    this.setState({
      quizStarted: false,
      quizFinished: true
    });
    // The array that contains objects with a question type, the number of correct answers from that type and total answers from that type 
    let summary = [];

    console.log(this.state.questions);
    this.state.questions.forEach((question) => {
      // question.question is the component with the formatted question
      console.log(question.question);
      let questionType = question.question.type.name;
      let summaryIndex = null;
      // Get the summary entry object with the matching question type
      summary.forEach((question,i) => {
        if(question.questionType == questionType) summaryIndex = i;
      });

      // Apply changes to summary
      if(summaryIndex !== null) {
        if(question.answeredCorrectly) summary[summaryIndex].correctAnswers += 1;
        summary[summaryIndex].totalAnswers += 1;
      }
      else {
        let correctAnswers = 0;
        if(question.answeredCorrectly) correctAnswers = 1;
        let summaryObject = {
          questionType: questionType,
          correctAnswers: correctAnswers,
          totalAnswers: 1
        };
        summary.push(summaryObject)
      }
      console.log(summary);
      
    })
    
    // Change the questionType properties to more readable ones for displaying in the summary
    summary.forEach((el) => {
      el.questionType = el.questionType.replace(/([A-Z])/g, ' $1').trim();
    })
    this.setState({
      summary: summary,
      questions: [],
      currentQuestion: 0
    })
  }
  render() {
    let currentQuestion = {...this.state.questions[this.state.currentQuestion]};
    console.log(this.state)
    return (
      <div id="quiz">
      {
      (this.state.quizStarted) &&
      <>
        {currentQuestion.question}
        <Answers 
        answers={currentQuestion.answers}
        correctAnswer={currentQuestion.correctAnswer}
        answerFunc={this.answer}
        ></Answers>
      </>
      }
      {
      (!this.state.quizStarted && !this.state.summary) &&
      <StartView
        startFunc={this.startFunc}
        loading={this.state.loading}
      ></StartView>
      }

      {this.state.summary && <Summary summary={this.state.summary}></Summary>}
      </div>
    )
  }
}
