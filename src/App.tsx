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


//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App(): JSX.Element{
  const [key, setKey] = useState<string>(keyData); //for api key input

  //const [home, setHome] = useState<boolean>(true);
  const [basic, setBasic] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);

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

  function updateBasic():void{
    setBasic(true);
    setDetail(false);
  }

  function updateDetail():void{
    setDetail(true);
    setBasic(false);
  }

  function handleClick(): void{
    if(setDetail){
      setDetail(false);
    }
    if(setBasic){
      setBasic(false);
    }
  }


  //function to handle the career report response
  function handleResponse(responseData: string) : void {
    setResponse(responseData);
  }
  return (
    <body>

    <div className="App">
        <div className="header-box">
          <button className='home-button' onClick={handleClick}>
              The Pathfinder <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link>
          </button>
          <div className="nav-bar">
          <Button className="button-33" onClick={handleClick}>Home</Button>
          </div>
        </div>
        <div>
        <Form.Label className="custom-title">Take one of our comprehensive Career Quizzes powered by AI:</Form.Label>
        <Container>
            <Row className="row">
                <Col className="col">
                  <h3> Basic Questions </h3>
                  <p>The basic career quiz consists of multiple choice questions to see your interests. At the conclusion of the quiz it will give you a broad result of what field you may be interested in!</p>             
                </Col>
                <Col className="col">
                    <h3> Detailed Questions </h3>
                    <p>The detailed career quiz consists of short response questions in order to gain a better understanding of your interets. We use our AICareerChat software to analyze your responses so we can provide you with specific career choises that may interest you!</p>
                </Col>         
            </Row>
        </Container>
        <Button className="button-33" style={{ marginTop: '20px', marginRight:'210px'}} onClick={updateBasic} >
                        Take our Basic Career Quiz
        </Button>
        <Button className="button-33" style={{ marginTop: '20px', marginLeft:'210px'}} onClick={updateDetail}>
                        Take our Detailed Career Quiz
                      </Button>
        </div>
            <div className='quiz-content'>
              {basic && <BasicQuiz APIkey={key} handleResponse={handleResponse}/>}
              {detail && <DetailQuiz APIkey={key} handleResponse={handleResponse} />}
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
