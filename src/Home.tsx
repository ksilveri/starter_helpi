/* eslint-disable no-octal-escape */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import './App';
import { Button, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';


interface Props {
    setPageView: (pageView:string) => void;
}

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function Home({setPageView}: Props): JSX.Element{
  const [key, setKey] = useState<string>(keyData); //for api key input

 
//need to set the page view
//const [pageView, setPageView] = useState("Home");


  const [, setView] = useState<'home' | 'basic' | 'detail' | 'feedback'>('home');




  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }


  const handleViewChange = (newView: 'home' | 'basic' | 'detail' | 'feedback') => {
    setView(newView);
  };
  
  return (
    <div className="App">
      <div className="header-box">
        <button className='home-button' onClick={() => handleViewChange('home')}>
          The Pathfinder <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link>
        </button>
      </div>
      <div className="main-container">
        <Container className="intro-container">
          <h2>Take one of our comprehensive Career Quizzes powered by AI:</h2>
        </Container>
        <Container className="quiz-container">
          <h3>Basic Questions</h3>
          <p>The basic career quiz consists of multiple choice questions to see your interests. At the conclusion of the quiz it will give you a broad result of what field you may be interested in! We use our AICareerChat software to analyze your responses so we can provide you with specific career choices that may interest you!</p>
          <Button className="button-33" onClick={() => setPageView("BasicQuiz")}>
            Take our Basic Career Quiz
          </Button>
        </Container>
        <Container className="quiz-container">
          <h3>Detailed Questions</h3>
          <p>The detailed career quiz consists of short response questions in order to gain a better understanding of your interests. We use our AICareerChat software to analyze your responses so we can provide you with specific career choices that may interest you!</p>
          <Button className="button-33" onClick={() => setPageView('DetailQuiz')}>
            Take our Detailed Career Quiz
          </Button>
        </Container>
        <Container className="feedback-container">
          <h4>After you complete the quizzes please fill out this Feedback Survey so we can improve your experience!!!<link href="https://fonts.googleapis.com/css?family=Press%20Start%202P" rel="stylesheet"></link></h4>
          <Button className="button-33" onClick={() => setPageView('FeedbackQuiz')}>
            Feedback Survey
          </Button>
        </Container>
      </div>
      <div className="footer">
        <Form>
          <Form.Label>API Key: <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link></Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <Button className="button-34" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
    </div>
  );
  
  
}

export default Home;
