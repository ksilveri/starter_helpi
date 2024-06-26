import React, { useState } from 'react';
import './quizzes.css';
import { Button, Form,} from 'react-bootstrap';
import OpenAI from 'openai';
import Markdown from 'markdown-to-jsx';
import { PropagateLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './progressBar';



function BasicQuiz({APIkey, handleResponse}: {APIkey: string, handleResponse: (response:string) => void}) {

    const quizQuestions = [
        "I enjoy working in a team environment rather than independently.",
        "I prefer a job with a structured routine over one that offers flexibility.",
        "I am comfortable with taking on leadership roles and making decisions.",
        "I value continuous learning and skill development in my career.",
        "I am willing to relocate for career advancement opportunities.",
        "I feel motivated when my work directly contributes to making a positive impact on society.",
        "I prefer a fast-paced work environment where tasks change frequently.",
        "I prioritize work-life balance over career advancement.",
        "I feel confident in my ability to adapt to new technologies and tools in the workplace.",
        "I enjoy networking and building professional relationships with others in my field.",
        "I enjoy thinking outside the box to develop new ideas and solutions.",
        "I remain calm and focused under pressure, even in challenging situations.",
        "I am skilled at communicating ideas effectively to a diverse audience.",
        "I am interested in exploring entrepreneurship or starting my own business.",
        "I excel at analyzing complex problems and developing innovative solutions."
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [progress, setProgress] = useState<number>(0)
    const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(Array(quizQuestions.length).fill(false));


    
    const updateProgress = () => {
      const answeredQuestionsCount = responses.filter(response => response !== '').length;
      const progress = ((answeredQuestionsCount + 1) / quizQuestions.length) * 100;
      setProgress(progress);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };
  

    const [responses, setResponses] = useState(Array(quizQuestions.length).fill(''));
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
    if (!answeredQuestions[index] && value !== '') {
      updateProgress();
      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[index] = true;
      setAnsweredQuestions(newAnsweredQuestions);
    }
  };

  const handleShowResponses = () => {
    const responseWindow = window.open('', 'ResponseWindow', 'width=600,height=400');
    if (responseWindow) {
      const htmlContent = responses.map((response, index) => (
        `<p><strong>Question ${index + 1}: </strong>${quizQuestions[index]}</p><p><strong>Response: </strong>${response}</p>`
      )).join('');
      responseWindow.document.body.innerHTML = htmlContent;
    } else {
      alert('Popup blocked! Please allow pop-ups for this site.');
    }
  };

  const formattedProgress = progress.toFixed(0);

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
              "content": "You are a career guidance specialist with extensive experience in analyzing career quiz results and providing tailored recommendations. Your goal is to help the user discover their ideal career path based on their unique preferences and strengths."
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
        console.error(error);
        setError('Error fetching career insights.  Please enter your API key and try again.');
      }
      finally {
        setLoading(false);
      }
    };
    return (
        <div className ="basic-quiz">
          <video autoPlay loop muted className='background-video'>
            <source src = "https://storage.googleapis.com/pathfinder_video/Gen-2%2012s%2C%203620141223%2C%20M%206.mp4" type = "video/mp4"/>
          </video>
          <div className = "content-box">
            <div className='basic-title'>Basic Career Quiz <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link></div>

            <ProgressBar progress={progress}/>
            <div className="progress-bar-label">{`${formattedProgress}%`}</div>

            <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
              <Form.Label className="custom-label">
                    {currentQuestionIndex+1}. {quizQuestions[currentQuestionIndex]}
            </Form.Label>

            <div className='basic-buttons'>
              {['Strongly Agree', 'Agree', 'Neither Agree nor Disagree', 'Disagree', 'Strongly Disagree'].map((option, index) => (
              <label key={index} className="custom-radio-button">
              <input
                type="radio"
                name={`question_${currentQuestionIndex}`}
                value={option}
                checked={responses[currentQuestionIndex] === option}
                onChange={() => handleResponseChange(currentQuestionIndex, option)}
                />
            <span>{option}</span>
            </label>
        ))}
          </div>
                  <p></p>
            </Form.Group>


            {currentQuestionIndex < quizQuestions.length - 1 ? (
                <Button className="button-33 button-nav" onClick={handleNextQuestion} style={{marginLeft: '10px', marginTop: '15px'}}>Next</Button>
            ) : (
              <><Button className="button-33" onClick={handleSubmit} disabled={!isValid || buttonClicked}>Submit</Button><p></p><Button className="button-33" onClick={handleShowResponses} disabled={!isValid}>Click Here To See Your Responses.</Button></>
            )}
            {currentQuestionIndex > 0 && (
                <Button className="button-33 button-nav"  onClick={handlePreviousQuestion} style={{marginRight: '20px', marginTop: '15px'}}>Previous</Button>
            )}

            {error && <p>{error}</p>}
            
            {loading ? (
              <div className="spinner" style={{paddingTop: '25px'}}>
                <PropagateLoader color={'#254117'} loading={loading} size={30} />
              </div>
            ) : (
              <>
              </>
            )}
            {isSubmitted && <><p style={{marginTop: '25px'}}><FontAwesomeIcon icon={faCheckCircle} color="#254117" size="5x" /></p><p style={{fontSize: '25px', fontWeight: 'bold'}}>Submission successful! Your responses have been processed.</p></>}
            <Markdown>{careerReport}</Markdown>
         </div>

        </div>
    );
}

export default BasicQuiz;