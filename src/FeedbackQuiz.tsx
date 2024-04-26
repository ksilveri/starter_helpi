/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import './quizzes.css';
import './App.css';
import { Button } from 'react-bootstrap';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const FeedbackQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalQuestions = 4;
 
  const questions: Question[] = [
    {
      id: 1,
      text: 'Did you find the questions easy to understand?',
      options: ['Yes', 'Unsure', 'No']
    },
    {
      id: 2,
      text: 'Did you encounter technical issues with the quiz',
      options: ['Yes', 'Unsure', 'No']
    },
    
    {
        id: 3,
        text: 'Did you find the quiz questions relevant to your career interests and goals?',
        options: ['Agree', 'Neither Agree or Disagree', 'Disagree']
      },
      {
        id: 4,
        text: 'Would you recommend this quiz to others?',
        options: ['Yes', 'Unsure', 'No']
      },
  ];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      
      console.log('Thank you for your responses');
    }
  };


const handlePreviousQuestion = () => {
  setCurrentQuestionIndex(prevIndex => prevIndex - 1);
};

 const handleSubmitQuestion = () => {
  setIsSubmitted(true);
 } 

  const handleOptionSelect = (option: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = option;
    setAnswers(updatedAnswers);
  };

  return (
    <div>
      <h1>Feedback Quiz</h1>
      {currentQuestionIndex < questions.length ? (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{questions[currentQuestionIndex].text}</p>
          <div>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option${index}`}
                  name={`question${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </div>
            ))}
          </div>
          {currentQuestionIndex > 0 && (
                <Button className="button-33" onClick={handlePreviousQuestion} style={{marginTop: '20px', marginRight: '20px'}}>Previous</Button>
            )}

          <Button className="button-33" style={{ marginTop: '20px', marginRight:'20px'}} onClick={handleNextQuestion}>Next</Button>
          
          {currentQuestionIndex === totalQuestions -1 && (
            <Button className="button-33" onClick={handleSubmitQuestion} style={{marginTop: '20px', marginRight: '20px'}} >Submit</Button>
          )}

{isSubmitted && <><p style={{marginTop: '25px'}}><FontAwesomeIcon icon={faCheckCircle} color="#254117" size="5x" /></p><p style={{fontSize: '25px'}}>Thank you for your feedback!!!</p></>}
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default FeedbackQuiz;
