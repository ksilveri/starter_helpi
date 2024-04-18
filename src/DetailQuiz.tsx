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
                <Form.Label>Question two:</Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Group>

            <Form.Group controlId="question3">
                <Form.Label>question 3<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>


            <Form.Group controlId="question4">
                <Form.Label>question 4<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>

            <Form.Group controlId="question5">
                <Form.Label>question 5<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>

            <Form.Group controlId="question6">
                <Form.Label>question 6<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>

            <Form.Group controlId="question7">
                <Form.Label>question 7<Form.Label>
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