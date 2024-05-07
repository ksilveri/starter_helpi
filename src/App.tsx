/* eslint-disable no-octal-escape */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import BasicQuiz from './BasicQuiz';
import DetailQuiz from './DetailQuiz';
import FeedbackQuiz from './FeedbackQuiz';
import Home from './Home';




function App(): JSX.Element{


//need to set the page view
const [pageView, setPageView] = useState("Home");



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
      {pageView === "BasicQuiz" && <BasicQuiz APIkey={''} handleResponse={() => {}} />}
      {pageView === "DetailQuiz" && <DetailQuiz APIkey={''} handleResponse={() => {}} />}
      {pageView === "FeedbackQuiz" && <FeedbackQuiz />}
    </React.Fragment>
  );
}

export default App;
