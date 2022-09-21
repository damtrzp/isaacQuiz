import React from 'react'

export default function SummarySection(props) {
    let percentage = props.correctAnswers / props.totalAnswers;
    // Set the bar color based on percentage
    let color;
    if(percentage < 0.333) color = "red"
    else if (percentage < 0.666) color = "#CFBA00"
    else color = "green";
    
    percentage *= 100;
    percentage = Math.floor(percentage);
    percentage += "%";
    
    let gradient = `linear-gradient(to right, ${color}, ${color} ${percentage}, transparent ${percentage}, transparent 100%)`;
  return (
    <section>
        {props.label}: 
        <span className="summaryBar" style={{
            backgroundImage: gradient
        }}>
            {`${props.correctAnswers} / ${props.totalAnswers} (${percentage})`}
        </span>
    </section>
  )
}
