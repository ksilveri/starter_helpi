/* eslint-disable no-octal-escape */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Form} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BasicQuiz from './BasicQuiz';
import DetailQuiz from './DetailQuiz';
import FeedbackQuiz from './FeedbackQuiz';


//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App(): JSX.Element{
  const [key, setKey] = useState<string>(keyData); //for api key input

  const [view, setView] = useState<'home' | 'basic' | 'detail' | 'feedback'>('home');


  //need to hide the descriptions/quiz titles/quiz buttons & feedback survey 
  const [basicTitle, setBasicTitle] = useState<string>("Basic Career Quiz");






  //state for career report
  const [response, setResponse] = useState<string>('');

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  //function updateHome():void{
    //setHome(!home);
  //}

  const handleViewChange = (newView: 'home' | 'basic' | 'detail' | 'feedback') => {
    setView(newView);
  };



  //function to handle the career report response
  function handleResponse(responseData: string) : void {
    setResponse(responseData);
  }
  return (
    <body>

    <div className="App">
        <div className="header-box">
          <button className='home-button' onClick={() => handleViewChange('home')}>
              The Pathfinder <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link>
          </button>
          <div className="nav-bar">
          <Button className="button-33" onClick={() => handleViewChange('home')}>Home</Button>
          </div>
        </div>
        {view === 'home' && (
        <div>
        <Form.Label className="custom-title">Take one of our comprehensive Career Quizzes powered by AI:</Form.Label>
        <Container>
            <Row className="row">
                <Col className="col">
                  <h3> Basic Questions </h3>

                  <p>The basic career quiz consists of multiple choice questions to see your interests. At the conclusion of the quiz it will give you a broad result of what field you may be interested in! We use our AICareerChat software to analyze your responses so we can provide you with specific career choises that may interest you!</p>             

                  <p>The basic career quiz consists of multiple choice questions to see your interests. At the conclusion of the quiz it will give you a broad result of what field you may be interested in!  We use our AICareerChat software to analyze your responses so we can provide you with specific career choises that may interest you!</p>             

                </Col>
                <Col className="col">
                    <h3> Detailed Questions </h3>
                    <p>The detailed career quiz consists of short response questions in order to gain a better understanding of your interets. We use our AICareerChat software to analyze your responses so we can provide you with specific career choises that may interest you!</p>
                </Col>         
            </Row>
        </Container>
        <Button className="button-33" style={{ marginTop: '20px', marginRight:'210px'}} onClick={() => handleViewChange('basic')} >
                        Take our Basic Career Quiz
        </Button>
        <Button className="button-33" style={{ marginTop: '20px', marginLeft:'210px'}} onClick={() => handleViewChange('detail')}>
                        Take our Detailed Career Quiz
                      </Button>
                      <br></br>
                      <br></br>
                      <br></br>
                      <h4>After you complete the quizzes please fill out a Feedback Survey</h4>
                      <Button className="button-33" style={{ marginTop: '20px', marginRight:'4px'}} onClick={() => handleViewChange('feedback')} >
                        Feedback Survey</Button>
        </div>
        )}
            <div className='quiz-content'>
              {view === 'basic' && <BasicQuiz APIkey={key} handleResponse={handleResponse}/>}
              {view === 'detail' && <DetailQuiz APIkey={key} handleResponse={handleResponse} />}
              {view === 'feedback' && <FeedbackQuiz/>}
              <div className='results'>
            <p>{response}</p>
           </div>
            </div>
        <div className="footer">
        <Form>
          <Form.Label>API Key:  <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link></Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <div className='button-container'>
          <Button className="button-34" onClick={handleSubmit}>Submit</Button>
          </div>
        </Form>
      </div>
      </div>
    </body>
  );
 
}

export default App;
