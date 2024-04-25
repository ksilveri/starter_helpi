/* eslint-disable no-template-curly-in-string */
import React, { useState, ChangeEvent } from 'react';
import './quizzes.css';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import OpenAI from "openai";
import Markdown from 'markdown-to-jsx';
import { PropagateLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import ProgressBar from './progressBar';



function DetailQuiz({APIkey, handleResponse}: {APIkey: string, handleResponse: (response:string) => void}) {

    const detailQuestions = [
        "1. Describe your ideal work environment.",
        "2. Describe your ideal job.",
        "3. How do you spend your time?",
        "4. What has been your favorite subject to learn about and why?",
        "5. How would you define success?",
        "6. Do you enjoy interacting and/or working with other people?",
        "7. What do you think are your strengths?",
    ]

    //states used for the textboxes and progress
    const [responses, setResponses] = useState(Array(7).fill(''));
    const [isValid, setIsValid] = useState(false);
    const [report, setReport] = useState('');
    const [showResponses, setShowResponses] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [progress, setProgress] = useState<number>(0)

    const updateProgress = (index: number) => {
        setProgress(((index + 1)/7) * 100)
      }

    const formattedProgress = progress.toFixed(0);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newResponses = [...responses];
        newResponses[currentQuestionIndex] = event.target.value;
        setResponses(newResponses);
        setIsValid(newResponses.every(response => response !== ''));
        updateProgress(currentQuestionIndex);
    };
    
    //function for submitting answers
    async function submitAnswers() {
        setLoading(true);
        try {
        const openai = new OpenAI({apiKey: APIkey, dangerouslyAllowBrowser: true });
        const userAnswers = responses.map((response, index): string => detailQuestions[index] + ':' + response);
        const userContent = userAnswers.join('\n');
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
              {
                "role": "system",
                "content": "You are a career guidance specialist with extensive experience in analyzing career quiz results and providing tailored recommendations. Your goal is to help the user discover their ideal career path based on their unique preferences and strengths."
              },
              {
                "role": "user",
                "content": userContent
              }
            ],
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          const careerReport = response.choices[0].message.content || '';
          setReport(careerReport);
          setIsSubmitted(true);
          setLoading(false);
          setError('');
        } catch (error){
            console.error('Error fetching career insights:', error);
        setError('Error fetching career insights. Please try again later.');
        }
    }

    return (
        <div className ="detail-quiz">
            <Form.Label className="custom-header">Detailed Career Quiz</Form.Label>
            
            <ProgressBar progress={progress}/>
            <div className="progress-bar-label">{`${formattedProgress}%`}</div>

            <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
                <Form.Label className="custom-label">{detailQuestions[currentQuestionIndex]}
                </Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={responses[currentQuestionIndex]}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e)}
                    placeholder="Type response..."/>
            </Form.Group>

            {currentQuestionIndex > 0 && (
                <Button className="button-33" onClick={handlePreviousQuestion} style={{marginRight: '10px'}}>Previous</Button>
            )}

            {currentQuestionIndex < 7 - 1 ? (
                <Button className="button-33" onClick={handleNextQuestion} style={{marginLeft: '10px'}}>Next</Button>
            ) : (
              <><Button className="button-33" onClick= { submitAnswers} disabled={!isValid}>Submit</Button><p></p><Button className="button-33" onClick={() => setShowResponses(true)} disabled={!isValid}>Click Here To See Your Responses.</Button></>
            )}
            

            {loading ? (
             <div className="spinner">
               <PropagateLoader color={'#254117'} loading={loading} size={30} />
             </div>
           ) : (
             <>
             </>
           )}
           {loading && (
             <div style={{ marginTop: '50px', textAlign: 'center' }}>
               <strong>Hang tight! Your responses are being loaded.</strong>
             </div>
           )}


           {isSubmitted && <><p style={{marginTop: '25px'}}><FontAwesomeIcon icon={faCheckCircle} color="#254117" size="5x" /></p><p style={{fontSize: '25px'}}>Submission successful! Your responses have been processed.</p></>}
            <Markdown>{report}</Markdown>

            {showResponses && (
                <>
                    <h2>Collected Responses:</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ul>
                        {responses.map((response, index) => (
                            <li key={index} style={{ textAlign: 'left' }}>
                                <strong>Question: </strong>{detailQuestions[index]}
                                <br />
                                <strong>Response: </strong> {response}
                            </li>
                        ))}
                    </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default DetailQuiz;

function setError(arg0: string) {
    throw new Error('Function not implemented.');
}
