import React from "react";
import { Link } from "react-router-dom";
import "./questions.css";
import { motion } from "framer-motion";

function SmellsFuelPage() {
  return (
    <>
      <motion.div
        className="container home-page__container"
        initial={{ y: "100vw" }}
        animate={{ y: 0 }}
        exit={{ y: "-100vw" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="main__title">Do you smell fuel/oil inside your car?</h1>

        <div className="home__buttons">
          <Link to="/acceleration">
            <div className="btn btn-primary">Yes</div>
            <div className="btn btn-secondary">No</div>
          </Link>
        </div>
      </motion.div>
      <Link to="/acceleration">Go back</Link>
    </>
  );
}

export default SmellsFuelPage;
