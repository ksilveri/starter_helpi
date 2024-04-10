/* eslint-disable no-octal-escape */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    

    <div className="App">
        <div className="header-box">
          <h1>The PathFinder <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link>
          </h1>
        </div>
        <div>
        <Container>
            <Row className="row">
                <Col className="col">
                  <h3> Basic Questions </h3>
                  TODO: put description here
                  <Button>Basic Career Quiz</Button>
                </Col>
                <Col className="col">
                    <h3> Detailed Questions </h3>
                    TODO: put description here
                </Col>
            </Row>
        </Container>
        </div>
            <Row>
              <Col>
              <img src="https://i.imgur.com/U4hAdwL.jpeg" alt="Divider" className="divider" />
              </Col>
            </Row>
            <Row>
              <Col>
              <h2>Take one of our comprehensive Career Quizzes:</h2>
              </Col>
            </Row>
        <div className="footer">
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
      </div>
  );
}

export default App;
