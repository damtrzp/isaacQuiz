import React from 'react'

function QualityQuestion(props) {
  return props.itemName ? (
    <div className="question">
          What 
          <span style={{color: "var(--highlight-text)"}}> Quality </span> 
          does the item 
          <span style={{color: "var(--highlight-text)"}}>
          {` ${props.itemName} `} 
          </span>
          have?
    </div>
  ) : null;
}

function ChargeQuestion(props) {
  return props.itemName && (
    <div className="question">
      How many 
      <span style={{color: "var(--highlight-text)"}}> charges </span> 
      are required for the item 
      <span style={{color: "var(--highlight-text)"}}>
          {` ${props.itemName} `} 
      </span>
    </div>
  )
}

function CharacterUnlockQuestion(props) {
  if(props.itemName) {
    return (
      <div className="question">
        Which
        <span style={{color: "var(--highlight-text)"}}> character </span>
        unlocks
        <span style={{color: "var(--highlight-text)"}}> {props.itemName} </span>
      </div>
    )
  }
  return null;
}

function ItemDescriptionQuestion(props) {
  if(props.itemName) {
    return (
      <div className="question">
        Which
        <span style={{color: "var(--highlight-text)"}}> description </span>
        does the item
        <span style={{color: "var(--highlight-text)"}}> {props.itemName} </span>
        have?
      </div>
    )
  }
}

export {QualityQuestion, ChargeQuestion, CharacterUnlockQuestion, ItemDescriptionQuestion}