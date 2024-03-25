// Importing CSS for styling
import "./questions.css";

// Importing necessary React and React Router functionalities
import React, { useRef, useState } from "react";
import { questionData } from "../../assets/questionData";
import { Link } from "react-router-dom";

// Functional component for rendering diagnostic questions
export const Questions = () => {
  // State variables using the useState hook
  const [index, setIndex] = useState(0); // Index of the current question
  const [question, setQuestion] = useState(questionData[index]); // Current question object
  const [lock, setLock] = useState(false); // Flag to control whether the user can answer
  const [score, setScore] = useState(0); // User's score
  const [result, setResult] = useState(false); // Flag to indicate quiz completion
  const [answers, setAnswers] = useState([]); // Array to store user's answers
  const [displayIssues, setDisplayIssues] = useState(false); // Flag to display car issues

  // Refs for each option to be used for styling
  const Option1 = useRef(null);
  const Option2 = useRef(null);

  // Array to hold option refs
  const option_array = [Option1, Option2];

  // Function to check the user's answer
  const checkAns = (e, ans) => {
    //e represents the event object when one of the buttons is clicked
    if (lock === false) {
      // lock prevents user from answering twice
      if (question.ans === ans) {
        // if answer matches correct answer
        e.target.classList.add("correct"); // add green css class to show as "yes"
        setLock(true); //set lock to true to prevent further answering
        setScore((prev) => prev + 1); //add one score to the user score
      } else {
        e.target.classList.add("wrong"); // add wrong css red styling for the "no answer"
        setLock(true); //set lock to true to prevent further answering
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setAnswers([...answers, ans]); //append chosen answer to the answers array
    }
  };

  // Function to move to the next question
  const next = () => {
    if (lock === true) {
      if (index === questionData.length - 1) {
        // check if question is last question in the array
        setResult(true); //indication of quiz completion
        return; // return stops further questions
      }
      setIndex((prevIndex) => prevIndex + 1); //update index of question by adding 1
      setQuestion(questionData[index + 1]); //updates question state with next question from array
      setLock(false);
      // Resetting styles for options
      option_array.forEach((option) => {
        //iterate through each option and reset styling for yes and no
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  // Function to reset the quiz by resetting every state to default value
  const reset = () => {
    setIndex(0);
    setQuestion(questionData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setAnswers([]);
    setDisplayIssues(false);
  };

  // Function to display car issues
  const viewCarIssues = () => {
    setDisplayIssues(true);
  };

  // JSX rendering
  return (
    <div className="container">
      <h1>Diagnostic Questions</h1>
      <hr />
      {result ? (
        <></> // Render nothing when the quiz is completed
      ) : (
        <>
          {/* Render the current question */}
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            {/* Render options as list items */}
            <li
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1); //set event object to 1 for use in checkans
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2); //set event object to 2 for use in checkans
              }}
            >
              {question.option2}
            </li>
          </ul>
          {/* Button to move to the next question */}
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {questionData.length} questions
          </div>
        </>
      )}
      {/* Display the result and provide options for resetting or viewing car issues */}
      {result ? (
        <>
          <h2>
            You have {score} out of {questionData.length} problems with your car
          </h2>
          <button onClick={reset}>Reset your choices</button>
          <button onClick={viewCarIssues}>View your car issues</button>
        </>
      ) : (
        <></>
      )}
      {/* Display car issues if the flag is set */}
      {displayIssues && (
        <div className="issues-container">
          <h2>Car Issues:</h2>
          <ul>
            {/* Map through answers to display corresponding car issues */}
            {answers.map((answer, index) => {
              const selectedQuestion = questionData[index];
              return answer === 1 ? (
                <li key={index}>{selectedQuestion.problem}</li>
              ) : null;
            })}
          </ul>
        </div>
      )}
      {/* Container for home page buttons */}
      <div className="home__buttons">
        {/* Link to navigate to the login page */}
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>

        {/* Link to navigate to the register page */}
        <Link to="/register" className="btn btn-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
};

// Exporting the component as default
export default Questions;
