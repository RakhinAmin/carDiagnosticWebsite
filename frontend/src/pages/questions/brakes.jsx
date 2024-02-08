// Import necessary modules and styles
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./questions.css"; // Assuming this is the style sheet for the component
import { motion } from "framer-motion";
import BrakeResponse from "../../components/response/BrakeResponse";

// Define the BrakesPage component
function BrakesPage() {
  // State to store the user's selection (Yes or No), set to null
  const [inputBrakes, setInputBrakes] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Render the component
  return (
    <>
      {/* Framer Motion animation for the container */}
      <motion.div
        className="container home-page__container"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "-100vw" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Display the question */}
        <h1 className="main__title">Do you have noisy/squeaky brakes?</h1>

        {/* Buttons for user selection */}
        <div className="home__buttons">
          {/* Use React Router's Link component to navigate to the next page */}

          {/* Button for "Yes" with condition set based on user's selection */}
          <button
            className="btn btn-secondary"
            onClick={() => setInputBrakes(!inputBrakes)}
          >
            Yes
          </button>
          {inputBrakes && <BrakeResponse />}
          {/* Button for "No" with condition set based on user's selection */}
          <Link to="/acceleration">
            <button
              className="btn btn-primary"
              onClick={() => setInputBrakes(!inputBrakes)}
            >
              No
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Link to navigate back to the home page */}
      <Link to="/">Go to Home Page</Link>
    </>
  );
}

// Export the component for use in other parts of the application
export default BrakesPage;
