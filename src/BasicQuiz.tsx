import React, { useState } from 'react';
import './quizzes.css';
import { Button, Form, } from 'react-bootstrap';
import OpenAI from "openai";
import axios from 'axios';


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
    const [isValid, setIsValid] = useState(false);
    const [careerInsights, setCareerInsights] = useState<string>('');

    const handleResponseChange = (index: number, value: string): void => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
    setIsValid(newResponses.every(response => response !== ''));
  };

  const handleSubmit = async () => {
    try {
        const response = await axios.post('OPENAI_API_ENDPOINT', { responses });
        const insights = response.data.insights; 
        setCareerInsights(insights);
        setShowResponses(true);
      } catch (error) {
        console.error('Error fetching career insights:', error);
      }
    };

  const generateCareerReport = (responses: string[]) => {
    const report = `Based on your responses:\n1. You are satisfied with the service.\n2. You agree with the statement.\n3. You found the product helpful.\n\nYour recommended career path: Software Developer`;
    return report;
  };


    return (
        <div className ="basic-quiz">
            <Form.Label className="custom-header">Basic Career Quiz</Form.Label>
            <p><Form.Label className="custom-label">Let's see which career environment interest you the most.</Form.Label></p>
            {createQuizQuestions(quizQuestions, responses, handleResponseChange)}
      
            <Button className="button-33" onClick={() => setShowResponses(true)}>Click Here To See Your Responses.</Button>
            <button onClick={handleSubmit} disabled={!isValid}>Submit</button>
            {showResponses && (
                <>
                    <h2>Collected Responses:</h2>
                    <ul>
                        {responses.map((response, index) => (
                            <li key={index}>{`Question ${index + 1}: ${response}`}</li>
                        ))}
                    </ul>
                    <h2>Career Insights:</h2>
                    <p>{careerInsights}</p>
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