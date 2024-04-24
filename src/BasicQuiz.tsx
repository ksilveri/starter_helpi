import React, { useState } from 'react';
import './quizzes.css';
import { Button, Form, ProgressBar} from 'react-bootstrap';
import OpenAI from 'openai';
import Markdown from 'markdown-to-jsx';
//import { PropagateLoader } from 'react-spinners';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';



function BasicQuiz({APIkey, handleResponse}: {APIkey: string, handleResponse: (response:string) => void}) {

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
        "10. I enjoy networking and building professional relationships with others in my field.",
        "11. I enjoy thinking outside the box to develop new ideas and solutions.",
        "12. I remain calm and focused under pressure, even in challenging situations.",
        "13. I am skilled at communicating ideas effectively to a diverse audience.",
        "14. I am interested in exploring entrepreneurship or starting my own business.",
        "15. I excel at analyzing complex problems and developing innovative solutions."
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const progress = (currentQuestionIndex + 1 / quizQuestions.length) * 100;

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

    const [responses, setResponses] = useState(Array(quizQuestions.length).fill(''));
    const [showResponses, setShowResponses] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [careerReport, setCareerReport] = useState('');
    const [error, setError] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResponseChange = (index: number, value: string): void => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
    setIsValid(newResponses.every(response => response !== ''));
  };

  const handleSubmit = async () => {
    setLoading(true);
     if (!buttonClicked) { // Check if button is not already clicked
        setButtonClicked(true);}
    try {
        const openai = new OpenAI({ apiKey: APIkey, dangerouslyAllowBrowser: true });
        const userAnswers = responses.map((response, index): string => quizQuestions[index] + ':' + response)
        const userContent = userAnswers.join('\n');
        const response = await openai.chat.completions.create({
          model: 'gpt-4-turbo',
          messages: [
            {
              "role": 'system',
              "content": "You are a career guidance specialist who will draw in depth results from this user's career quiz results and craft them a detailed career report",
            },
            {
              "role": 'user',
              "content": userContent,
            }
          ],
          temperature: 1,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        const report = response.choices[0].message.content || '';
        setCareerReport(report);
        setError('');
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error fetching career insights:', error);
        setError('Error fetching career insights. Please try again later.');
      }
      finally {
        setLoading(false);
      }
    };
    return (
        <div className ="basic-quiz">
          <ProgressBar now={progress} label={`${progress}%`} />
            <h1>Basic Career Quiz <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link></h1>
            <p><strong>Let's see which career environment interest you the most.</strong></p>

            
            <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
            <Form.Label className="custom-label">
                    {quizQuestions[currentQuestionIndex]}
            </Form.Label>
            <p></p>
                <div className='basic-buttons'>
                  <strong><input
                  type="radio"
                  name={`question_${currentQuestionIndex}`}
                  value="agree"
                  checked={responses[currentQuestionIndex] === 'agree'}
                  onChange={() => handleResponseChange(currentQuestionIndex, 'agree')}
                  /> Agree
                  <input
                    type="radio"
                    name={`question_${currentQuestionIndex}`}
                    value="Neither Agree nor Disagree"
                    checked={responses[currentQuestionIndex] === 'Neither Agree nor Disagree'}
                    onChange={() => handleResponseChange(currentQuestionIndex, 'Neither Agree nor Disagree')}
                  /> Neither Agree nor Disagree
                  <input
                    type="radio"
                    name={`question_${currentQuestionIndex}`}
                    value="disagree"
                    checked={responses[currentQuestionIndex] === 'disagree'}
                    onChange={() => handleResponseChange(currentQuestionIndex, 'disagree')}
                  /> Disagree</strong>
                  </div>
                  <p></p>
            </Form.Group>
            {currentQuestionIndex > 0 && (
                <Button className="button-33" onClick={handlePreviousQuestion}>Previous</Button>
            )}

            {currentQuestionIndex < quizQuestions.length - 1 ? (
                <Button className="button-33" onClick={handleNextQuestion}>Next</Button>
            ) : (
              <><Button className="button-33" onClick= { handleSubmit} disabled={!isValid || buttonClicked}>Submit</Button><Button className="button-33" onClick={() => setShowResponses(true)} disabled={!isValid}>Click Here To See Your Responses.</Button></>
            )}

            {error && <p>{error}</p>}
            
            {loading ? (
              <div className="spinner">
              </div>
            ) : (
              <>
              </>
            )}
            <Markdown>{careerReport}</Markdown>


            {showResponses && (
                <>
                    <h2>Collected Responses:</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ul>
                        {responses.map((response, index) => (
                            <li key={index} style={{ textAlign: 'left' }}>
                                <strong>Question: </strong>{quizQuestions[index]}
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

export default BasicQuiz;