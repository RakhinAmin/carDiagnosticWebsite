import React, { useState } from "react";

const RectangleComponent = () => {
  // State to store the input value
  const [inputValue, setInputValue] = useState("");

  // Function to handle button click
  const handleButtonClick = () => {
    console.log("Input Value:", inputValue);
  };

  return (
    <div className="rectangle-container">
      {/* Input field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text here"
      />

      {/* Button */}
      <button onClick={handleButtonClick}>Click Me</button>
    </div>
  );
};

export default RectangleComponent;
