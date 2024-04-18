import React, { useState } from 'react';
import './quizzes.css';
import { Form } from 'react-bootstrap';



function DetailQuiz() {
    //states used for the textboxes
    const [first, setInitial] = useState<string>('');
    const [second, setSecond] = useState<string>('');
    const [third, setThird] =useState<string>('');
    const [fourth, setFourth] =useState<string>('');
    const [fifth, setFifth] =useState<string>('');
    const [sixth, setSixth] =useState<string>('');
    const [seventh, setSeventh] =useState<string>('');
    
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

    return (
        <div className ="detail-quiz">
            <h3> Detailed Career Quiz</h3>
            <Form.Group controlId="question1">
                <Form.Label>Describe your ideal work environment.</Form.Label>
                <Form.Control
                    value={first}
                    onChange={updateFirst}/>
            </Form.Group>

            <Form.Group controlId="question2">
                <Form.Label>Describe your ideal job.</Form.Label>
                <Form.Control
                    value={second}
                    onChange={updateSecond}/>
            </Form.Group>

            <Form.Group controlId="question3">
                <Form.Label>How do you spend your time?</Form.Label>
                <Form.Control
                    value={third}
                    onChange={updateThird}/>
            </Form.Group>

            <Form.Group controlId="question4">
                <Form.Label>What has been your favorite class and why?</Form.Label>
                <Form.Control
                    value={fourth}
                    onChange={updateFourth}/>
            </Form.Group>

            <Form.Group controlId="question5">
                <Form.Label>How would you define success?</Form.Label>
                <Form.Control
                    value={fifth}
                    onChange={updateFifth}/>
            </Form.Group>

            <Form.Group controlId="question6">
                <Form.Label>Do you enjoy interacting and/or working with other people?</Form.Label>
                <Form.Control
                    value={sixth}
                    onChange={updateSixth}/>
            </Form.Group>

            <Form.Group controlId="question7">
                <Form.Label>What do you think are your strengths?</Form.Label>
                <Form.Control
                    value={seventh}
                    onChange={updateSeventh}/>
            </Form.Group>
        </div>
    );
}

export default DetailQuiz;