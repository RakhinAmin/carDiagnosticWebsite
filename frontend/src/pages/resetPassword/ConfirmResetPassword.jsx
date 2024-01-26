import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordConfirm } from "../../features/auth/authSlice";
import { AiFillLock } from "react-icons/ai";
import Spinner from "../../components/Spinner";

const ResetPasswordPageConfirm = () => {
  // Extracting uid and token from the URL parameters (unique user identifier and security token)
  const { uid, token } = useParams();

  // State to store the input values for new password and confirm new password
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  // Destructuring form data into variables for the necessary form objects to be used later in the dispatch actions (these interact with authService and authSlice)
  const { new_password, re_new_password } = formData;

  // Hooks for navigation, dispatch, and selecting data from the Redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selecting loading, error, success, and message state from the Redux store
  const { isLoading, isError, isSuccess, message } = useSelector(
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

  // Event handler for form submission to prevent page refresh
  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating a user data object with uid, token, and the new password
    const userData = {
      uid,
      token,
      new_password,
      re_new_password,
    };

    // Dispatching the resetPasswordConfirm action with user data
    dispatch(resetPasswordConfirm(userData));
  };

  // useEffect to handle side effects after a render
  useEffect(() => {
    // Displaying error toast if isError is true (uid and/or token do not match with pair in the database)
    if (isError) {
      toast.error(message);
    }

    // Redirecting to the home page and showing a success toast if reset is successful (uid and token match)
    if (isSuccess) {
      navigate("/");
      toast.success("Your password was reset successfully.");
    }
  }, [isError, isSuccess, message, navigate, dispatch]); // Array to ensure isSuccess is run if any of these states change

  // JSX for the reset password confirmation page
  return (
    <>
      <div className="container auth__container">
        <h1 className="main__title">
          Reset Password here <AiFillLock />
        </h1>

        {/* Displaying a spinner while loading */}
        {isLoading && <Spinner />}

        {/* Reset password confirmation form */}
        <form className="auth__form">
          <input
            type="password"
            placeholder="New password"
            name="new_password"
            onChange={handleChange} // Calls the handleChange function to update the state with the entered value
            value={new_password} // Sets input value into a React controllable state
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            name="re_new_password"
            onChange={handleChange} // Calls the handleChange function to update the state with the entered value
            value={re_new_password} // Sets input value into a React controllable state
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

export default ResetPasswordPageConfirm;
