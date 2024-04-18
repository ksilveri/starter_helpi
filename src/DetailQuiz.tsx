import React, { useState } from 'react';
import './quizzes.css';
import { Form } from 'react-bootstrap';



function DetailQuiz() {
    const [initial, setIntial] = useState<string>('test');

    function updateInitial(event: React.ChangeEvent<HTMLInputElement>){
        setIntial(event?.target.value)
    }
    return (
        <div className ="detail-quiz">
            <h3> Detailed Career Quiz</h3>
            <Form.Group controlId="question1">
                <Form.Label>textbox<Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Label>
            </Form.Label>
            </Form.Group>
            <Form.Group controlId="question2">
                <Form.Label>Second Textbook:</Form.Label>
                <Form.Control
                    value={initial}
                    onChange={updateInitial}/>
            </Form.Group>
        </div>
    );
}

export default DetailQuiz;