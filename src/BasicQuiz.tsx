import React, { useState } from 'react';
import './quizzes.css';
import { Form } from 'react-bootstrap';

const OPTIONS = [
    "Agree",
    "Neither Agree nor Disagree",
    "Disagree"
]

function BasicQuiz() {
    const [option, setOption] = useState<string>("option1");

    function updateOption(event: React.ChangeEvent<HTMLInputElement>) {
        setOption(event.target.value);
    }

    return (
        <div className ="basic-quiz">
            <h3> Basic Career Quiz</h3>
            <p>Testing future</p>
            <p>Hello</p>
            <p>Testing Adding More Lines for Scrolling</p>
            <p>another test line</p>
            <p>1. Make a new software?</p>
            <div>
                {OPTIONS.map((opt: string) => (
                    <>
                    <Form.Check
                        key={opt}
                        inline
                        type="radio"
                        name="option"
                        onChange={updateOption}
                        label={opt}
                        value={opt}
                        checked={opt===option}
                        />
                    </>
                ))}
            </div>
        </div>
    );
}

export default BasicQuiz;