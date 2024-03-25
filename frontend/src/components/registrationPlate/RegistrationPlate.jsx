import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import rectangleImage from "../../assets/home_images/Rectangle 3.svg";
import astonMartinDB5Image from "../../assets/home_images/astonmartindb5.svg";
import frame5Image from "../../assets/home_images/Frame 5.svg";
import frame4Image from "../../assets/home_images/Frame 4.svg";

import carImage from "../../assets/home_images/Group 1.svg"; // Import your new image
import "./RegistrationPlate.css"; // Import the CSS file

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
      <div className="image-container">
        <img
          src={rectangleImage}
          alt="Rectangle"
          className="background-image"
        />
        <img
          src={astonMartinDB5Image}
          alt="Aston Martin DB5"
          className="car-image"
        />
      </div>

      <label>Reg Number</label>
      <input
        id="inputReg"
        type="text"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
      />
      <img
        src={frame4Image}
        alt="Submit"
        className="btn-submit"
        onClick={submitReg}
        style={{ cursor: "pointer" }} // Makes the image behave like a clickable button
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
            style={{ cursor: "pointer" }} // This makes the cursor change to a pointer when hovering over the image
          />
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPlate;
