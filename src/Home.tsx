/* eslint-disable no-octal-escape */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import './App';
import { Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';


interface Props {
    setPageView: (pageView:string) => void;
}


function Home({setPageView}: Props): JSX.Element{

 
//need to set the page view
//const [pageView, setPageView] = useState("Home");


  const [, setView] = useState<'home' | 'basic' | 'detail' | 'feedback'>('home');




  



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
    </div>
  );
  
  
}

export default Home;
