import React from "react";
import { Link } from "react-router-dom";
import carImage from "../../assets/home_images/astonmartin.svg";
import "./home.css";

function App() {
  return (
    <div
      className="home-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "9vw",
          fontFamily: "Lora",
          fontWeight: "700",
          color: "#24242a",
          width: "100%",
          textAlign: "center",
        }}
      >
        Car Diagnostics
      </h1>
      <div
        className="outer_container"
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
            height: "25vw",
            borderRadius: "30px",
            justifyContent: "center", // Center the content horizontally
            alignItems: "center", // Center the content vertically
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Updated styles for the image */}
            <img
              src={carImage}
              alt="astonMartin"
              className="astonMartin"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div
            style={{
              width: "35%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1
              className="home-title"
              style={{
                maxWidth: "100%",
                color: "white",
                fontSize: "4vh",
                fontFamily: "lora",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              We will help you find the issue with your car
            </h1>
            <div
              className=""
              style={{
                alignItems: "center",
                backgroundColor: "#ffd600",
                display: "flex",
                width: "100%",
                borderRadius: 8,
              }}
            >
              <div style={{}}>
                <div style={{ flexDirection: "column" }}>
                  <h1 style={{ color: "black", fontSize: "1.5vw" }}>UK</h1>
                </div>
              </div>

              <div style={{ margin: 6 }}>
                <input
                  id="inputReg"
                  type="text"
                  style={{
                    padding: 12,
                    borderRadius: 5,
                    borderWidth: 1,
                    width: "140%",
                    color: "#ffd600",
                    borderColor: "black",
                    backgroundColor: "#ffd600",
                  }}
                />
              </div>
            </div>
            <h2
              className="home-subtitle"
              style={{
                maxWidth: "60%",
                color: "white",
                fontSize: "2vh",
                fontFamily: "lora",
              }}
            >
              Enter your reg now to find your solution
            </h2>
          </div>
          <Link
            to="/questions"
            style={{
              fontFamily: "lora",
              fontSize: "2vh",
              color: "white",
              height: "9vh",
              width: "11vw",
              backgroundColor: "#d5600f",
              borderRadius: "30px",
              borderWidth: "0",
              borderColor: "#d5600f",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginLeft: "auto",
              marginTop: "auto",
              textDecoration: "none",
            }}
          >
            Get Quotes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
