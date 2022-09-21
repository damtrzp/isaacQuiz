import React from "react";
import {QualityQuestion, ChargeQuestion, CharacterUnlockQuestion, ItemDescriptionQuestion} from "./Questions/questionsComponents";
import QuestionType from "./enum";

// Charge question answer formatting
function ChargeAnswer(amount, unit = "") {
  let answer = `${amount} ${unit}`;
  answer = answer[0].toUpperCase() + answer.slice(1);
  return answer;
}
function shuffledArray(array) {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
  }
  return newArray;
}

let items;
let apiUrl = "https://www.platynowy-bog.com.pl"
fetch(`${apiUrl}/api/items`)
.then(response => response.json())
.then(data => {
      items = data;
    }
);

function generateQuestion() {
    return new Promise((resolve, reject) => {
        // 718 items as of now
        let itemsAmount = 718
        let activeItemIds = [33,34,35,36,37,38,39,40,41,42,44,45,47,49,56,58,65,66,77,78,83,84,85,86,93,97,102,105,107,111,123,124,126,127,130,133,135,136,137,145,146,158,160,164,166,171,175,177,181,186,192,282,283,284,285,287,288,289,290,291,292,293,294,295,296,297,298,323,324,325,326,338,347,348,349,351,352,357,382,383,386,396,406,419,422,427,434,437,439,441,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,504,507,508,510,512,515,516,521,522,523,527,536,540,545,549,550,552,555,556,557,577,578,580,584,585,604,605,609,611,622,623,625,628,631,635,636,639,640,642,650,653,655,685,687,703,705,706,709,710,711,712,713,714,715,719,720,722,723,728,729];
          let possibleAnswersSeconds = [
            ChargeAnswer(1,"s"),
            ChargeAnswer(2,"s"),
            ChargeAnswer(3,"s"),
            ChargeAnswer(4,"s"),
            ChargeAnswer(6,"s")
          ];
          let possibleAnswersSecondsSpecial = [
            ChargeAnswer(7,"s"),
            ChargeAnswer(10,"s"),
            ChargeAnswer(15,"s"),
            ChargeAnswer(16,"s"),
          ];
          let possibleAnswersRooms = [
            ChargeAnswer(1,"rooms"),
            ChargeAnswer(2,"rooms"),
            ChargeAnswer(3,"rooms"),
            ChargeAnswer(4,"rooms"),
            ChargeAnswer(6,"rooms"),
            ChargeAnswer(12,"rooms"),
          ];
        // Get random question type
        let questionType = Math.floor(Object.keys(QuestionType).length * Math.random())
        
        // Quality Questions
        if(questionType == QuestionType.QualityQuestion) {
          let itemId = Math.floor(Math.random() * itemsAmount);
          let itemName = items[itemId].name;
          let itemQuality = items[itemId].quality
            let question = {
              question: <QualityQuestion itemName={itemName}></QualityQuestion>,
              correctAnswer: itemQuality,
              answers: [0,1,2,3,4]
            }
            resolve(question);
        }
        // Charge Questions
        // TO BE REFACTORISED, THE CODE IS AWFUL RIGHT NOW
        if(questionType == QuestionType.ChargeQuestion) {
          let itemId = activeItemIds[Math.floor(Math.random() * activeItemIds.length)]
          fetch(`${apiUrl}/api/items/${itemId}`)
          .then(response => response.json())
          .then(data => {
            let answers = [ChargeAnswer("unlimited"), ChargeAnswer("one time use")]
            // Randomise different sets of answers based on the correct answer type
            if(data.rechargeTime.unit == "s" && Number(data.rechargeTime.amount) <= 6) {
              let additionalAnswers = shuffledArray(possibleAnswersSeconds);
              let correctAnswer = ChargeAnswer(data.rechargeTime.unit, data.rechargeTime.amount);
              additionalAnswers = additionalAnswers.filter((el) => {
                return el != correctAnswer
              })
              answers[2] = additionalAnswers[0];
              answers[3] = additionalAnswers[1];
              answers[4] = ChargeAnswer(data.rechargeTime.amount, data.rechargeTime.unit);
              answers = shuffledArray(answers);
            }
            else if(data.rechargeTime.unit == "s" && Number(data.rechargeTime.amount) >= 7) {
              let additionalAnswers = shuffledArray(possibleAnswersSecondsSpecial);
              let correctAnswer = ChargeAnswer(data.rechargeTime.unit, data.rechargeTime.amount);
              additionalAnswers = additionalAnswers.filter((el) => {return el != correctAnswer})
              answers[2] = additionalAnswers[0];
              answers[3] = additionalAnswers[1];
              answers[4] = ChargeAnswer(data.rechargeTime.amount, data.rechargeTime.unit);
              answers = shuffledArray(answers);
            }
            else if(data.rechargeTime.unit == "rooms") {
              let correctAnswer = ChargeAnswer(data.rechargeTime.amount, data.rechargeTime.unit);
              let additionalAnswers = shuffledArray(possibleAnswersRooms);
              additionalAnswers = additionalAnswers.filter((el) => {return el != correctAnswer})
              answers[2] = additionalAnswers[0];
              answers[3] = additionalAnswers[1];
              answers[4] = correctAnswer;
              answers = shuffledArray(answers);
            }
            else {
              let additionalAnswers = shuffledArray(possibleAnswersRooms);
              answers[2] = additionalAnswers[0];
              answers[3] = additionalAnswers[1];
              answers[4] = additionalAnswers[2];
              answers = shuffledArray(answers);
            }
            let question = {
              question: <ChargeQuestion itemName={data.name}></ChargeQuestion>,
              correctAnswer: ChargeAnswer(data.rechargeTime.amount, data.rechargeTime.unit),
              answers: answers
            }
            resolve(question);
          });
        }
        if(questionType == QuestionType.CharacterUnlockQuestion) {
          let itemId = Math.floor(Math.random() * itemsAmount);
          let characters = [
            "Isaac",
            "Magdalene",
            "Cain",
            "Judas",
            "???",
            "Eve",
            "Samson",
            "Azazel",
            "Lazarus",
            "Eden",
            "The Lost",
            "Lilith",
            "Keeper",
            "Apollyon",
            "The Forgotten",
            "Bethany",
            "Jacob and Esau",
            "Tainted Isaac",
            "Tainted Magdalene",
            "Tainted Cain",
            "Tainted Judas",
            "Tainted ???",
            "Tainted Eve",
            "Tainted Samson",
            "Tainted Azazel",
            "Tainted Lazarus",
            "Tainted Eden",
            "Tainted Lost",
            "Tainted Lilith",
            "Tainted Keeper",
            "Tainted Apollyon",
            "Tainted Forgotten",
            "Tainted Bethany",
            "Tainted Jacob",
          ];
          let properItemFound = false;
          let correctAnswer;
          let itemName;
          while(!properItemFound) {
            let checkedItem = items[Math.floor(Math.random() * itemsAmount)];
            if(checkedItem.unlock && checkedItem.unlock.character) {
              properItemFound = true;
              correctAnswer = checkedItem.unlock.character;
              itemName = checkedItem.name;
            }
          }
          let charactersWithoutCorrect = characters.filter(el => {return el != correctAnswer});
          charactersWithoutCorrect = shuffledArray(charactersWithoutCorrect);
          let answers = [
            correctAnswer,
            charactersWithoutCorrect[0],
            charactersWithoutCorrect[1],
            charactersWithoutCorrect[2],
            charactersWithoutCorrect[3],
          ]
          answers = shuffledArray(answers);
            let question = {
              question: <CharacterUnlockQuestion itemName={itemName}></CharacterUnlockQuestion>,
              correctAnswer: correctAnswer,
              answers: answers
            }
            resolve(question);
        }
        if(questionType == QuestionType.ItemDescriptionQuestion) {
          let answers = [];
          let itemName;
          while(answers.length < 5) {
            let item = items[Math.floor(Math.random() * itemsAmount)];
            answers.push(item.quote);
            itemName = item.name;
          }
          let correctAnswer = answers[4];
          answers = shuffledArray(answers);

          let question = {
            question: <ItemDescriptionQuestion itemName={itemName}></ItemDescriptionQuestion>,
            correctAnswer: correctAnswer,
            answers: answers
          }
          resolve(question);
        }
      })
}
async function generateMultipleQuestions(questionAmount) {
  let questions = []
  for(let i = 0; i < questionAmount; i++) {
    let question = await generateQuestion()
    questions.push(question)
  }
  return questions;
}

export {generateQuestion, generateMultipleQuestions};