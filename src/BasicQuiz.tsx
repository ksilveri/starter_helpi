import React, { useState } from 'react';
import './quizzes.css';
import { Button, Form, } from 'react-bootstrap';
//import { Form } from 'react-bootstrap';

function BasicQuiz() {

    const quizQuestions = [
        "1. I enjoy working in a team environment rather than independently.",
        "2. I prefer a job with a structured routine over one that offers flexibility.",
        "3. I am comfortable with taking on leadership roles and making decisions.",
        "4. I value continuous learning and skill development in my career.",
        "5. I am willing to relocate for career advancement opportunities.",
        "6. I feel motivated when my work directly contributes to making a positive impact on society.",
        "7. I prefer a fast-paced work environment where tasks change frequently.",
        "8. I prioritize work-life balance over career advancement.",
        "9. I feel confident in my ability to adapt to new technologies and tools in the workplace.",
        "10. I enjoy networking and building professional relationships with others in my field."
    ];

    const [responses, setResponses] = useState(Array(quizQuestions.length).fill(''));
    const [showResponses, setShowResponses] = useState(false);

    const handleResponseChange = (index: number, value: string): void => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };


    return (
        <div className ="basic-quiz">
            <Form.Label className="custom-header">Basic Career Quiz</Form.Label>
            <p><Form.Label className="custom-label">Let's see which career environment interest you the most.</Form.Label></p>
      {createQuizQuestions(quizQuestions, responses, handleResponseChange)}
      
      <Button className="button-33" onClick={() => setShowResponses(true)}>Click Here To See Your Responses.</Button>
      {showResponses && (
        <>
          <h2>Collected Responses:</h2>
          <ul>
            {responses.map((response, index) => (
              <li key={index}>{`Question ${index + 1}: ${response}`}</li>
            ))}
          </ul>
        </>
      )}
    </div>
    );
}

const createQuizQuestions = (questions: string[], responses: string[], handleResponseChange: (index: number, value: string) => void) => {
    return questions.map((question, index) => (
      <div key={index}>
        <div><Form.Label className="custom-label">{question}</Form.Label></div>
        <input
          type="radio"
          name={`question_${index}`}
          value="agree"
          checked={responses[index] === 'agree'}
          onChange={() => handleResponseChange(index, 'agree')}
        /> Agree
        <input
          type="radio"
          name={`question_${index}`}
          value="Neither Agree nor Disagree"
          checked={responses[index] === 'Neither Agree nor Disagree'}
          onChange={() => handleResponseChange(index, 'Neither Agree nor Disagree')}
        /> Neither Agree nor Disagree
        <input
          type="radio"
          name={`question_${index}`}
          value="disagree"
          checked={responses[index] === 'disagree'}
          onChange={() => handleResponseChange(index, 'disagree')}
        /> Disagree
        <p></p>
      </div>
    ));
  };


export default BasicQuiz;