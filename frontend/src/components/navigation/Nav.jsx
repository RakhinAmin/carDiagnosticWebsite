import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // React router is used for navigating between page URL's
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Nav = () => {
  // Declaring React Router's useNavigate hook for navigation between pages
  const navigate = useNavigate();
  // Redux hooks for accessing dispatch actions and authSlice states (pending, fulfilled, rejected)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Function to handle logout
  const handleLogout = () => {
    // Dispatching Redux actions to logout and reset state
    dispatch(logout()); // Logout action dispatched from authSlice
    dispatch(reset());
    // Navigate to the home page URL
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Home link */}
      <NavLink className="logo" to="/">
        HOME
      </NavLink>
      {/* Navigation links */}
      <ul className="nav-links">
        {user ? ( // Conditional rendering based on user authentication (if user is not logged in, only Dashboard link will show)
          <>
            {" "}
            {/* If the user is logged in, the Logout link will also show */}
            {/* Dashboard link for authenticated user */}
            <NavLink className="nav-childs" to="/dashboard">
              Dashboard
            </NavLink>
            {/* Logout link for authenticated user */}
            <NavLink className="nav-childs" to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            {/* Dashboard link for non-authenticated user */}
            <NavLink className="nav-childs" to="/dashboard">
              Dashboard
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
