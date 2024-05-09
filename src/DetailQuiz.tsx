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
        "Describe your ideal work environment.",
        "Describe your ideal job.",
        "How do you spend your time?",
        "What has been your favorite subject to learn about and why?",
        "How would you define success?",
        "How would you describe yourself?",
        "What do you value most in a job?",
    ]

    //states used for the textboxes and progress
    const [responses, setResponses] = useState(Array(7).fill(''));
    const [isValid, setIsValid] = useState(false);
    const [report, setReport] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [progress, setProgress] = useState<number>(0)
    const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(detailQuestions.length).fill(false));

    const updateProgress = () => {
      const answeredQuestionsCount = responses.filter(response => response !== '').length;
      const progress = ((answeredQuestionsCount + 1) / detailQuestions.length) * 100;
      setProgress(progress);
    };

    const handleShowResponses = () => {
      const responseWindow = window.open('', 'ResponseWindow', 'width=600,height=400');
      if (responseWindow) {
        const htmlContent = responses.map((response, index) => (
          `<p><strong>Question ${index + 1}: </strong>${detailQuestions[index]}</p><p><strong>Response: </strong>${response}</p>`
        )).join('');
        responseWindow.document.body.innerHTML = htmlContent;
      } else {
        alert('Popup blocked! Please allow pop-ups for this site.');
      }
    };

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
        if (!answeredQuestions[currentQuestionIndex] && event.target.value !== '') {
          updateProgress();
          const newAnsweredQuestions = [...answeredQuestions];
          newAnsweredQuestions[currentQuestionIndex] = true;
          setAnsweredQuestions(newAnsweredQuestions);
        }
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
            console.error(error);
            setError('Error fetching career insights. Please enter your API key and try again.');
        }
    }

    return (
        <div className ="detail-quiz">
          <video autoPlay loop muted className='background-video'>
            <source src="https://storage.googleapis.com/detailed_questions_bucket/Gen-2%2016s%2C%203214526360%2C%20M%206.mp4" type="video/mp4"/>
          </video>
          <div className="content-box">
             <h1 className="basic-title">Detailed Career Quiz<link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link></h1>
            
            <ProgressBar progress={progress}/>
            <div className="progress-bar-label">{`${formattedProgress}%`}</div>

            <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
                <Form.Label className="custom-label">
                {currentQuestionIndex+1}. {detailQuestions[currentQuestionIndex]}
                </Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={responses[currentQuestionIndex]}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e)}
                    placeholder="Type response..."/>
            </Form.Group>


            {currentQuestionIndex < 7 - 1 ? (
                <Button className="button-33" onClick={handleNextQuestion} style={{marginLeft: '30px'}}>Next</Button>
            ) : (
              <><Button className="button-33" onClick= { submitAnswers} disabled={!isValid} style={{marginLeft: '20px'}}>Submit</Button>
              <p></p>
              <Button className="button-33" onClick={handleShowResponses} disabled={!isValid}>Click Here To See Your Responses.</Button></>
            )}

            {currentQuestionIndex > 0 && (
                <Button className="button-33" onClick={handlePreviousQuestion} style={{marginLeft: '40px'}}>Previous</Button>
            )}
            
            {error && <p>{error}</p>}

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
        </div>
        </div>
    );
}

export default DetailQuiz;
