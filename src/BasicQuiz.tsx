import React from 'react';
import './quizzes.css';
//import { Form } from 'react-bootstrap';



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
  
    const createQuizQuestions = (questions: string[]) => {
      return questions.map((question, index) => (
        <div key={index}>
            
          <div>{question}</div>
          <input type="radio" name={`question_${index}`} value="agree" /> Agree
          <input type="radio" name={`question_${index}`} value="Neither Agree nor Disagree" /> Neither Agree nor Disagree
          <input type="radio" name={`question_${index}`} value="disagree" /> Disagree
          <br />
        </div>
      ));
    };

function BasicQuiz() {
    return (
        <div>
      {createQuizQuestions(quizQuestions)}
    </div>
    );
}


export default BasicQuiz;