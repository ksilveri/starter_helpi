import React, { useState } from 'react';
import './quizzes.css';
import { Form } from 'react-bootstrap';



function DetailQuiz() {
    const [initial, setIntial] = useState<string>('');

    function updateInitial(event: React.ChangeEvent<HTMLInputElement>){
        setIntial(event?.target.value)
    }
    return (
        <div className ="detail-quiz">
            <h3> Detailed Career Quiz</h3>
            <Form.Group controlId="question1">
                <Form.Label>Describe your ideal work environment.<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>

            <Form.Group controlId="question2">
                <Form.Label>Describe your ideal job.</Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Group>

            <Form.Group controlId="question3">
                <Form.Label>How do you spend your time?<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>


            <Form.Group controlId="question4">
                <Form.Label>What has been your favorite class and why?<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>

            <Form.Group controlId="question5">
                <Form.Label>How would you define success?<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>

            <Form.Group controlId="question6">
                <Form.Label>Do you enjoy interacting and/or working with other people?<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>

            <Form.Group controlId="question7">
                <Form.Label>What do you think are your strengths?<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>
        </div>
    );
}

export default DetailQuiz;