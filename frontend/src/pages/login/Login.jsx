// Importing React hooks and components
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi"; // Importing a login icon
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { login, reset, getUserInfo } from "../../features/auth/authSlice"; // Importing actions from authSlice
import { toast } from "react-toastify"; // Importing toast notifications library
import Spinner from "../../components/Spinner"; // Importing a Spinner component
import backgroundImage from "../../assets/login_images/lancia037.jpg";
import "./login.css";

// Functional component representing the Login page
const LoginPage = () => {
  // Initialising state for storing necessary form data (email and password) using useState hook
  const [formData, setFormData] = useState({
    // formData is initial state, setFormData is modifiable state from user input
    email: "",
    password: "",
  });

  // Destructuring form data into variables for the email and password objects to be used
  const { email, password } = formData;

  // Redux hooks for dispatching actions and accessing state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructuring state variables from the authSlice (pending, fulfilled, failure)
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Handler function for input changes
  const handleChange = (e) => {
    // Uses object e to handle changes in form input
    setFormData((prev) => ({
      // Previous state received by setFormData function
      ...prev, // Copies properties of previous email and password properties into new state to be able to be changed
      [e.target.name]: e.target.value, // Updates form with current email and password input
    }));
  };

  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating an object with user data for login to be passed into authService
    const userData = {
      email,
      password,
    };

    // Dispatching the login action with user data
    dispatch(login(userData));
  };

  // Effect hook for handling side effects (errors) using toast library
  useEffect(() => {
    // Displaying error toast message if there is an error from authSlice
    if (isError) {
      toast.error(message);
    }

    // Navigating to the dashboard if login is successful
    if (isSuccess || user) {
      navigate("/dashboard");
    }

    // Resetting Redux state after handling errors
    dispatch(reset());

    // Dispatching the action to get user information
    dispatch(getUserInfo());
  }, [isError, isSuccess, user, navigate, dispatch]); // Dispatches relevant authSlice states based on the current user info (if it is logged in or logged out)

  // Visual content that is rendered
  return (
    <>
      {/* Container for the login page */}
      <div className="login_container">
        {/* Title for the login page with an imported login icon */}
        <img src={backgroundImage} alt="Background" className="login_image" />
        <h1 className="login_title">Welcome back!</h1>
        <h2 className="login_subtitle">
          Please enter your credentials below to log in.
        </h2>

        {/* Displaying a spinner from the spinner file and library when data is loading */}
        {isLoading && <Spinner />}

        {/* Form for user login */}
        <form className="email_box">
          {/* Input field for email */}
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange} // Calls upon handle change event to update the current form data and therefore the current state/event
            value={email}
            required
          />{" "}
        </form>
        <form className="password_box">
          {/* Input field for password */}
          <input
            type="password"
            placeholder="password" // Indication to user that a password must be typed
            name="password"
            onChange={handleChange} // Calls upon handle change event to update the current form data and therefore the current state/event
            value={password} // Turns password value into a React controllable state
            required // Validation to show that password is required
          />
        </form>

        {/* Link to the "Forgot Password?" page */}
        <Link to="/reset-password" className="forgot_password">
          Forgot Password?
        </Link>

        {/* Submit button for user login */}
        <button
          className="login_button"
          type="submit"
          onClick={handleSubmit} // Calls handleSubmit to prevent page refresh
        >
          Login
        </button>
      </div>
    </>
  );
};

export default LoginPage;
