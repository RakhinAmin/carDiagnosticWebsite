// Importing necessary React components and modules
import React from "react";
import { Link } from "react-router-dom"; // Importing link component to create links between pages
import { motion } from "framer-motion";
import RegistrationPlate from "../../components/registrationPlate/RegistrationPlate";
import carDiagnosticImage from "../../assets/home_images/Car Diagnostics.svg"; // Import your image file
import "./home.css";

// Main functional component named App
function App() {
  return (
    <div className="app-container">
      {" "}
      {/* This is the new container div */}
      {/* Main container for the home page */}
      <motion.div
        className="container home-page__container"
        style={{ backgroundColor: "#dedbc8" }} // Set the background color here
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "-100vw" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Main title for the home page (Car Diagnostic) */}
        <h1 className="main__title">
          <img src={carDiagnosticImage} alt="Car Diagnostic Title" />
        </h1>

        {/* Rendering the RectangleComponent which provides an input box and button to navigate to the chatbot page */}
        <RegistrationPlate />
      </motion.div>
    </div>
  );
}

export default App;
