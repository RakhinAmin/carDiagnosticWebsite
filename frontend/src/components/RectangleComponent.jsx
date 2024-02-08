import React, { useState } from "react";
import { Link } from "react-router-dom";

const RectangleComponent = () => {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    console.log("Input Value:", inputValue);
  };

  return (
    <div className="rectangle-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter text here"
          style={{
            marginRight: "8px",
            borderRadius: "5px",
            padding: "8px",
            border: "1px solid #ccc",
          }}
        />
        <Link to="/brakes">
          <button
            onClick={handleButtonClick}
            style={{
              borderRadius: "5px",
              padding: "8px",
              border: "1px solid #ccc",
            }}
          >
            <h1>Hi</h1>
            {/* Magnifying glass icon */}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RectangleComponent;
