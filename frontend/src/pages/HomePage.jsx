import React from "react";
import { Link } from "react-router-dom";
import RectangleComponent from "./RectangleComponent";
// Make sure to adjust the import path based on your project structure

function App() {
  return (
    <>
      <div className="container home-page__container">
        <h1 className="main__title">Car Diagnostic</h1>
        <RectangleComponent />
        <div className="home__buttons">
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
