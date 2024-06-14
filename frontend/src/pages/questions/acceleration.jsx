import React from "react";
import { Link } from "react-router-dom";
import "./questions.css";
import { motion } from "framer-motion";

function AccelerationPage() {
  return (
    <>
      <div
        className="question_container"
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
            height: "50vw",
            borderRadius: "30px",
          }}
        >
          <h1 className="main__title">
            Do you experience sluggish acceleration?
          </h1>

          <div className="home__buttons">
            <Link to="/smells">
              <div className="btn btn-primary">Yes</div>
              <div className="btn btn-secondary">No</div>
            </Link>
          </div>
          <Link to="/smokyexhaust">Go back</Link>
        </div>
      </div>
    </>
  );
}

export default AccelerationPage;
