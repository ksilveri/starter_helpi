/* eslint-disable no-octal-escape */
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button, Form, NavLink} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      
          <li className="links" onClick={() => setPageView("Home")}>Home</li>
          <li className="links" onClick={() => setPageView("BasicQuiz")}>Basic Career Quiz</li>
          <li className="links" onClick={() => setPageView("DetailQuiz")}>Detail Career Quiz</li>
          <li className="links" onClick={() => setPageView("FeedbackQuiz")}>Feedback Survey</li>
        </ul>
        </nav>
      </div>

     {pageView === "Home" && <Home setPageView={function (pageView: string): void {
        throw new Error('Function not implemented.');
      } } />}
      {pageView === "BasicQuiz" && <BasicQuiz APIkey={''} handleResponse={function (response: string): void {
        throw new Error('Function not implemented.');
      } } />}
      {pageView === "DetailQuiz" && <DetailQuiz APIkey={''} handleResponse={function (response: string): void {
        throw new Error('Function not implemented.');
      } } />}
      {pageView === "FeedbackQuiz" && <FeedbackQuiz />}

    </React.Fragment>
  );
}

export default App;
