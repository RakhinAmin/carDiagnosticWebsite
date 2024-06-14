import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import rectangleImage from "../../assets/home_images/Rectangle 3.svg";
import frame5Image from "../../assets/home_images/Frame 5.svg";
import frame4Image from "../../assets/home_images/Frame 4.svg";
import vector2Image from "../../assets/home_images/Vector 2.svg";
import "./RegistrationPlate.css"; // Import the CSS file
import { RegInput } from "../ButtonsAndInputs/RegInput";

const RegistrationPlate = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState(null);

  const handleButtonClick = () => {
    console.log("Input Value:", registrationNumber);
  };

  const submitReg = async () => {
    try {
      const apiKey = "hHx5QCLlIO8muuicFwHSl9pL2gQFtNje2dnNCfP2";

      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles/`,
        {
          registrationNumber: registrationNumber,
        },
        {
          headers: {
            "x-api-key": apiKey,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const { make, colour, taxStatus, motStatus, motExpiryDate } =
        response.data;
      setVehicleInfo({ make, colour, taxStatus, motStatus, motExpiryDate });

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting registration:", error.message);
    }
  };

  return (
    <div className="registration-plate">
      <div className="text-container">
        <h1>We will help you find any issue that your car has</h1>
        <div className="enter-reg">
          <h2>Enter your reg now to find your solution</h2>
        </div>
      </div>
      <div className="image-container">
        <div className="car-container"></div>
        <img src={vector2Image} alt="Bottom Arrow" className="bottom-arrow" />
      </div>

      <label>Reg Number</label>

      <input
        id="inputReg"
        type="text"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
      />

      <RegInput
        className="btn-submit"
        onClick={submitReg}
        style={{ cursor: "pointer" }}
      />

      <div>
        {vehicleInfo && (
          <>
            <div>{`Make: ${vehicleInfo.make}`}</div>
            <div>{`Colour: ${vehicleInfo.colour}`}</div>
            <div>{`Tax Status: ${vehicleInfo.taxStatus}`}</div>
            <div>{`MOT Status: ${vehicleInfo.motStatus}`}</div>
            <div>{`MOT Expiry Date: ${vehicleInfo.motExpiryDate}`}</div>
          </>
        )}
        <Link to="/questions">
          <img
            src={frame5Image}
            alt="Navigate to questions"
            className="frame5-image"
            onClick={handleButtonClick}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPlate;
