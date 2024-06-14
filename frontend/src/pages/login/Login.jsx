// Importing React hooks and components
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi"; // Importing a login icon
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { login, reset, getUserInfo } from "../../features/auth/authSlice"; // Importing actions from authSlice
import { toast } from "react-toastify"; // Importing toast notifications library
import Spinner from "../../components/Spinner"; // Importing a Spinner component
import backgroundImage from "../../assets/login_images/lancia037.jpg";

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
      <div
        className="login_container"
        style={{
          display: "flex", // Retain flex properties
          justifyContent: "center", // Center the content horizontally
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          className="inner_container"
          style={{
            backgroundColor: "#24242a", // Background color of the rectangle
            width: "70vw", // Specific width of the rectangle
            height: "40vw",
            borderRadius: "30px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex", // Add flex to align child elements
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "35vw",
              height: "40vw",
              overflow: "hidden",
            }}
          >
            {/* Title for the login page with an imported login icon */}
            <img
              src={backgroundImage}
              alt="Background"
              className="login_image"
              style={{
                display: "flex",
                borderRadius: "30px 0 0 30px",
                width: "100%",
                height: "auto",
              }}
            />
            {/* Displaying a spinner from the spinner file and library when data is loading */}
            {isLoading && <Spinner />}
          </div>
          <div style={{ justifyContent: "flex-end", width: "45%" }}>
            <h1
              className="login_title"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
                fontSize: "4vh",
                fontFamily: "lora",
                color: "white",
              }}
            >
              Welcome back!
            </h1>
            <h2
              className="login_subtitle"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                fontSize: "2vh",
                fontFamily: "lora",
                color: "white",
                maxWidth: "85%",
                marginBottom: "5vh",
              }}
            >
              Please enter your credentials below to log in.
            </h2>
            <form
              className=""
              style={{
                alignItems: "center",
                padding: 0,
                backgroundColor: "white",
                display: "flex",
                width: "85%", // Make form width 100% to cover the entire rectangle
                borderRadius: "10px",
                justifyContent: "flex-end", // Align to the right
                marginBottom: "5vh",
              }}
            >
              {/* Input field for email */}
              <input
                type="text"
                placeholder="email"
                name="email"
                onChange={handleChange}
                value={email}
                required
                style={{
                  padding: 12,
                  borderRadius: "10px",
                  borderWidth: 0,
                  width: "100%",
                  borderColor: "white",
                  backgroundColor: "white",
                  fontFamily: "lora",
                }}
              />
            </form>

            {/* Another form for password */}
            <form
              className=""
              style={{
                alignItems: "center",
                padding: 0,
                backgroundColor: "white",
                display: "flex",
                width: "85%", // Make form width 100% to cover the entire rectangle
                borderRadius: "10px",
                justifyContent: "flex-end", // Align to the right
                marginBottom: "1vh",
              }}
            >
              {/* Input field for password */}
              <input
                type="password" // Change input type to "password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={password} // Use password instead of email for input value
                required
                style={{
                  padding: 12,
                  borderRadius: "10px",
                  borderWidth: 0,
                  width: "100%",
                  borderColor: "white",
                  backgroundColor: "white",
                  fontFamily: "lora",
                }}
              />
            </form>

            {/* Link to the "Forgot Password?" page */}
            <div style={{ justifyContent: "flex-end", width: "85%" }}>
              <Link
                to="/reset-password"
                className="forgot_password"
                style={{
                  fontFamily: "lora",
                  color: "white",
                  display: "flex",
                  marginBottom: "1vh",
                  justifyContent: "flex-end",
                }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit button for user login */}
            <button
              className="login_button"
              type="submit"
              onClick={handleSubmit}
              style={{
                fontFamily: "lora",
                fontSize: "2vh",
                color: "white",
                height: "5vh",
                width: "10vw",
                backgroundColor: "#d5600f",
                borderRadius: "10px",
                borderWidth: "0",
                borderColor: "#d5600f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
