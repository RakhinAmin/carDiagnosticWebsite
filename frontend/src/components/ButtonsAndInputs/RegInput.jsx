import React, { Component } from "react";

export const RegInput = (props) => {
  return (
    <div
      className=""
      style={{
        alignItems: "center",
        backgroundColor: "#ffd600",
        display: "flex",
        width: "31%",
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
            width: "150%",
            color: "#ffd600",
            borderColor: "black",
            backgroundColor: "white",
          }}

          //value={registrationNumber}
          //onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </div>
    </div>
  );
};
