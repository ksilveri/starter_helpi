
/* eslint-disable no-octal-escape */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import BasicQuiz from './BasicQuiz';
import DetailQuiz from './DetailQuiz';
import FeedbackQuiz from './FeedbackQuiz';
import Home from './Home';
import { Button, Form } from 'react-bootstrap';




function App(): JSX.Element{
//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)

  let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}


//need to set the page view
const [pageView, setPageView] = useState("Home");


  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(APIkey));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  const [APIkey, setKey] = useState<string>(keyData); //for api key input


  return (
    <React.Fragment>
      <div>
        <nav className="navBar">
         
        <ul className="links">

          <li onClick={() => setPageView("Home")}>Home<link href="https://fonts.googleapis.com/css?family=Press%20Start%202P" rel="stylesheet"></link></li>
          <li onClick={() => setPageView("BasicQuiz")}>Basic Career Quiz<link href="https://fonts.googleapis.com/css?family=Press%20Start%202P" rel="stylesheet"></link></li>
          <li onClick={() => setPageView("DetailQuiz")}>Detail Career Quiz<link href="https://fonts.googleapis.com/css?family=Press%20Start%202P" rel="stylesheet"></link></li>
          <li onClick={() => setPageView("FeedbackQuiz")}>Feedback Survey<link href="https://fonts.googleapis.com/css?family=Press%20Start%202P" rel="stylesheet"></link></li>
        </ul>
        </nav>
      </div>

      {pageView === "Home" && <Home setPageView={setPageView} />}
      {pageView === "BasicQuiz" && <BasicQuiz APIkey={APIkey} handleResponse={() => {}} />}
      {pageView === "DetailQuiz" && <DetailQuiz APIkey={APIkey} handleResponse={() => {}} />}
      {pageView === "FeedbackQuiz" && <FeedbackQuiz />}
      <div className="footer">
        <Form>
          <Form.Label>API Key: <link href="https://fonts.cdnfonts.com/css/bell-bottom-laser" rel="stylesheet"></link></Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <Button className="button-34" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
      
    </React.Fragment>
    
  );

  
}

export default App;
