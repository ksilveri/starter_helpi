/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
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
    const [first, setInitial] = useState<string>('');
    const [second, setSecond] = useState<string>('');
    const [third, setThird] =useState<string>('');
    const [fourth, setFourth] =useState<string>('');
    const [fifth, setFifth] =useState<string>('');
    const [sixth, setSixth] =useState<string>('');
    const [seventh, setSeventh] =useState<string>('');
    const [report, setReport] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

   
    
    //progress bar
    const [progress, setProgress] = useState<number>(0)

    function updateProgress(){
        let answeredQuestions = 0;
    if (first.trim() !== '') answeredQuestions++;
    if (second.trim() !== '') answeredQuestions++;
    if (third.trim() !== '') answeredQuestions++;
    if (fourth.trim() !== '') answeredQuestions++;
    if (fifth.trim() !== '') answeredQuestions++;
    if (sixth.trim() !== '') answeredQuestions++;
    if (seventh.trim() !== '') answeredQuestions++;

    const percent = (answeredQuestions / detailQuestions.length) * 100;
    setProgress(percent);
    }

    const handleInputChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>, progressAdd: number) => {
        setter(value);
        updateProgress();
    }
    

    //function for submitting answers
    async function submitAnswers() {
        setLoading(true);
        const openai = new OpenAI({apiKey: APIkey, dangerouslyAllowBrowser: true });
        const userAnswers = `"1. Describe your ideal work environment." : ${first} "2. Describe your ideal job." : ${second} "3. How do you spend your time?" : ${third} "4. What has been your favorite class and why?" : ${fourth} "5. How would you define success?" : ${fifth} "6. Do you enjoy interacting and/or working with other people?" : ${sixth} "7. What do you think are your strengths?" : ${seventh}`;
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
              {
                "role": "system",
                "content": "You are a career guidance specialist who will draw in depth results from this user's career quiz results and craft them a detailed career report"
              },
              {
                "role": "user",
                "content": userAnswers
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
    }

    return (
        <div className ="detail-quiz">
            <Form.Label className="custom-header">Detailed Career Quiz</Form.Label>
            
            <ProgressBar progress={progress}/>
            <Form.Group controlId="question1">
                <Form.Label className="custom-label">1. Describe your ideal work environment.</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={first}
                    onChange={(e) => handleInputChange(e.target.value, setInitial, 10)}
                    placeholder="Type response..."/>
            </Form.Group>

            <Form.Group controlId="question2">
                <Form.Label className="custom-label">2. Describe your ideal job.</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={second}
                    onChange={(e) => handleInputChange(e.target.value, setSecond, 10)}
                    placeholder="Type response..."/>
            </Form.Group>

            <Form.Group controlId="question3">
                <Form.Label className="custom-label">3. How do you spend your time?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={third}
                    onChange={(e) => handleInputChange(e.target.value, setThird, 10)}
                    placeholder="Type response..."/>
            </Form.Group>

            <Form.Group controlId="question4">
                <Form.Label className="custom-label">4. What has been your favorite subject to learn about and why?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={fourth}
                    onChange={(e) => handleInputChange(e.target.value, setFourth, 10)}
                    placeholder="Type response..."/>
            </Form.Group>

            <Form.Group controlId="question5">
                <Form.Label className="custom-label">5. How would you define success?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={fifth}
                    onChange={(e) => handleInputChange(e.target.value, setFifth, 10)}
                    placeholder="Type response..."/>
            </Form.Group>

            <Form.Group controlId="question6">
                <Form.Label className="custom-label">6. Do you enjoy interacting and/or working with other people?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={sixth}
                    onChange={(e) => handleInputChange(e.target.value, setSixth, 10)}
                    placeholder="Type response..."/>
            </Form.Group>

            <Form.Group controlId="question7">
                <Form.Label className="custom-label">7. What do you think are your strengths?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={seventh}
                    onChange={(e) => handleInputChange(e.target.value, setSeventh, 10)}
                    placeholder="Type response..."/>
            </Form.Group>
            <Button className="button-33" onClick={submitAnswers}>Click Here To See Your Results</Button>
            

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
    );
}

export default DetailQuiz;