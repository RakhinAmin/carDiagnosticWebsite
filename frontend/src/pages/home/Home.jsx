// Importing necessary React components and modules
import React from "react";
import { Link } from "react-router-dom"; // Importing link component to create links between pages
import RectangleComponent from "../../components/RectangleComponent"; // Importing registration plate rectangle component
import { motion } from "framer-motion";

// Main functional component named App
function App() {
  return (
    <>
      {/* Main container for the home page */}
      <motion.div
        className="container home-page__container"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "-100vw" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Main title for the home page (Car Diagnostic) */}
        <h1 className="main__title">Car Diagnostic</h1>

        {/* Rendering the RectangleComponent which provides an input box and button to navigate to the chatbot page */}
        <RectangleComponent />

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
      </motion.div>
    </>
  );
}

export default App;
