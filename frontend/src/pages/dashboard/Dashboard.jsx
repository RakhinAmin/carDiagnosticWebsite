// Importing React library for creating React components
import React from "react";

// Importing useSelector hook from React Redux
import { useSelector } from "react-redux";

// Defining a functional component named Dashboard
const Dashboard = () => {
  // Using useSelector to extract userInfo from authSlice in order to be used for the welcome message
  const { userInfo } = useSelector((state) => state.auth);

  // Representing a container for the content of the Dashboard component
  return (
    <div>
      {/* Displaying a heading with a welcome message including the user's first name (from userInfo) */}
      <h1>Welcome, {userInfo.first_name} </h1>
    </div>
  );
};

export default Dashboard;
