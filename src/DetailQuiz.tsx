/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import './quizzes.css';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import OpenAI from "openai";
import Markdown from 'markdown-to-jsx';
import ProgressBar from './progressBar';



function DetailQuiz({APIkey, handleResponse}: {APIkey: string, handleResponse: (response:string) => void}) {
    //states used for the textboxes
    const [first, setInitial] = useState<string>('');
    const [second, setSecond] = useState<string>('');
    const [third, setThird] =useState<string>('');
    const [fourth, setFourth] =useState<string>('');
    const [fifth, setFifth] =useState<string>('');
    const [sixth, setSixth] =useState<string>('');
    const [seventh, setSeventh] =useState<string>('');
    const [report, setReport] = useState('');

    
    
    //functions used to update the textboxes
    function updateFirst(event: React.ChangeEvent<HTMLInputElement>) {
        setInitial(event.target.value)
    }
    function updateSecond(event: React.ChangeEvent<HTMLInputElement>) {
        setSecond(event.target.value)
    }
    function updateThird(event: React.ChangeEvent<HTMLInputElement>) {
        setThird(event.target.value)
    }
    function updateFourth(event: React.ChangeEvent<HTMLInputElement>) {
        setFourth(event.target.value)
    }
    function updateFifth(event: React.ChangeEvent<HTMLInputElement>) {
        setFifth(event.target.value)
    }
    function updateSixth(event: React.ChangeEvent<HTMLInputElement>) {
        setSixth(event.target.value)
    }
    function updateSeventh(event: React.ChangeEvent<HTMLInputElement>) {
        setSeventh(event.target.value)
    }
    //function for submitting answers
    async function submitAnswers() {
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
    }

    return (
        <div className ="detail-quiz">
            <Form.Label className="custom-header">Detailed Career Quiz</Form.Label>
            <ProgressBar />
            <Form.Group controlId="question1">
                <Form.Label className="custom-label">1. Describe your ideal work environment.</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={first}
                    onChange={updateFirst}/>
            </Form.Group>

            <Form.Group controlId="question2">
                <Form.Label className="custom-label">2. Describe your ideal job.</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={second}
                    onChange={updateSecond}/>
            </Form.Group>

            <Form.Group controlId="question3">
                <Form.Label className="custom-label">3. How do you spend your time?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={third}
                    onChange={updateThird}/>
            </Form.Group>

            <Form.Group controlId="question4">
                <Form.Label className="custom-label">4. What has been your favorite subject to learn about and why?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={fourth}
                    onChange={updateFourth}/>
            </Form.Group>

            <Form.Group controlId="question5">
                <Form.Label className="custom-label">5. How would you define success?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={fifth}
                    onChange={updateFifth}/>
            </Form.Group>

            <Form.Group controlId="question6">
                <Form.Label className="custom-label">6. Do you enjoy interacting and/or working with other people?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={sixth}
                    onChange={updateSixth}/>
            </Form.Group>

            <Form.Group controlId="question7">
                <Form.Label className="custom-label">7. What do you think are your strengths?</Form.Label>
                <Form.Control
                    className="custom-textbox"
                    value={seventh}
                    onChange={updateSeventh}/>
            </Form.Group>
            <Button className="button-33" onClick={submitAnswers}>Click Here To See Your Results</Button>
            <Markdown>{report}</Markdown>
        </div>
    );
}

export default DetailQuiz;