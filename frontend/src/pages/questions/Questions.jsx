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
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
      setAnswers([...answers, ans]);
      // Move to the next question after a short delay
      setTimeout(() => {
        next();
      }, 0); // 0.5 second delay before moving to the next question
    }
  };

  // Function to move to the next question
  const next = () => {
    if (index === questionData.length - 1) {
      setResult(true);
      return;
    }
    setIndex((prevIndex) => prevIndex + 1);
    setQuestion(questionData[index + 1]);
    setLock(false);
    option_array.forEach((option) => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
    });
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
    <div
      className="flex_container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        className="inner_container"
        style={{
          backgroundColor: "#24242a",
          width: "70vw",
          height: "40vw",
          borderRadius: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "50%",
          }}
        >
          {result ? (
            <></>
          ) : (
            <>
              <h2 style={{ fontFamily: "lora", color: "white" }}>
                {index + 1}. {question.question}
              </h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li
                  style={{
                    fontFamily: "lora",
                    color: "white",
                    height: "5vh",
                    width: "5vw",
                    backgroundColor: "#d5600f",
                    borderRadius: "10px",
                    borderWidth: "0",
                    borderColor: "#d5600f",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: "3vh",
                  }}
                  ref={Option1}
                  onClick={(e) => {
                    checkAns(e, 1);
                  }}
                >
                  {question.option1}
                </li>
                <li
                  style={{
                    fontFamily: "lora",
                    color: "black",
                    height: "5vh",
                    width: "5vw",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    borderWidth: "0",
                    borderColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  ref={Option2}
                  onClick={(e) => {
                    checkAns(e, 2);
                  }}
                >
                  {question.option2}
                </li>
              </ul>
              <div
                className="index"
                style={{
                  fontFamily: "lora",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                {index + 1} / {questionData.length} questions
              </div>
            </>
          )}
        </div>
        {result ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h2>
              You have {score} out of {questionData.length} problems with your
              car
            </h2>
            <button onClick={reset}>Reset your choices</button>
            <button onClick={viewCarIssues}>View your car issues</button>
          </div>
        ) : null}
        {displayIssues && (
          <div className="issues-container">
            <h2>Car Issues:</h2>
            <ul>
              {answers.map((answer, index) => {
                const selectedQuestion = questionData[index];
                return answer === 1 ? (
                  <li key={index}>{selectedQuestion.problem}</li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporting the component as default
export default Questions;
