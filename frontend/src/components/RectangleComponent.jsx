import React, { useState } from "react";
import { Link } from "react-router-dom";

const RectangleComponent = () => {
  // State to store the input value
  const [inputValue, setInputValue] = useState("");
  // Declares a state variable inputValue and a function setInputValue to update its value
  // The initial state is an empty string

  // Function to log the current value of the inputValue state to the console
  const handleButtonClick = () => {
    console.log("Input Value:", inputValue); // [4]
  };

  return (
    <div className="rectangle-container">
      {/* Input field */}
      <input // Allows user to input any text
        type="text"
        value={inputValue} // Binds the value of the input to the inputValue state, making it a controllable component
        onChange={(e) => setInputValue(e.target.value)} // Updates the inputValue state when the input value is changed by the user (by typing)
        placeholder="Enter text here"
      />

      {/* Use Link to navigate to a new page */}
      <Link to="/brakes">
        <button onClick={handleButtonClick}>Click Me</button>
      </Link>
    </div>
  );
};

export default RectangleComponent;
