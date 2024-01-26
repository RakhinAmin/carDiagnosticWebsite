// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { BiLogInCircle } from "react-icons/bi";
import Spinner from "../../components/Spinner";
import { resetPassword } from "../../features/auth/authSlice";

// Defining the LoginPage functional component
const LoginPage = () => {
  // Initialising state for storing necessary form data using useState hook
  const [formData, setFormData] = useState({
    email: "",
  });

  // Destructuring values from the formData state to be used
  const { email } = formData;

  // Accessing dispatch and navigate functions from React Redux and React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extracting relevant state variables from the Redux store using useSelector
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth // Takes redux state and returns only the authSlice states
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

  // Event handler to handle form submission and prevent page refresh
  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating userData object with the email for the resetPassword action
    const userData = {
      email,
    };

    // Dispatching the resetPassword action with userData as the parameter
    dispatch(resetPassword(userData));
  };

  // useEffect hook to handle side effects (e.g., displaying notifications) based on state changes
  useEffect(() => {
    // Displaying a toast error notification if isError is true
    if (isError) {
      toast.error(message);
    }

    // Redirecting to the home page and displaying a toast success notification if isSuccess is true
    if (isSuccess) {
      navigate("/");
      toast.success("A reset password email has been sent to you.");
    }
  }, [isError, isSuccess, message, navigate, dispatch]); // Array to ensure isSuccess condition is run if any of these states change

  // Rendering the login page
  return (
    <>
      <div className="container auth__container">
        <h1 className="main__title">
          Reset Password <BiLogInCircle />
        </h1>

        {/* Displaying a spinner component when isLoading is true */}
        {isLoading && <Spinner />}

        {/* Form for entering the email and initiating the password reset */}
        <form className="auth__form">
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange} // Calls the handleChange function to update the state with the entered value
            value={email} // Sets input value into a React controllable state
            required
          />

          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit} // Calls the handleSubmit function when the button is clicked
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
