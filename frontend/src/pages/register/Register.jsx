import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const RegisterPage = () => {
  // Initialising state for storing necessary form data (first name, last name, email password, retype password) using useState hook
  const [formData, setFormData] = useState({
    // formData is initial state, setFormData is modifiable state from user input
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  // Destructuring form data into variables for the necessary form objects to be used later in the dispatch actions (these interact with authService and authSlice)
  const { first_name, last_name, email, password, re_password } = formData;

  // Declaring Redux hook for dispatching actions and router hook for accessing states (using the formData)
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

  // Declaring handler function to prevent default form submission (resetting page)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Shows toast error pop up if passwords do not match
    if (password !== re_password) {
      toast.error("Passwords do not match");
    } else {
      // Creates object with new user data to be used in authSlice states and authService
      const userData = {
        first_name,
        last_name,
        email,
        password,
        re_password,
      };
      dispatch(register(userData)); // Calls register state in authSlice using the userData
    }
  };

  useEffect(() => {
    if (isError) {
      // useEffect hook from redux used if error state is given
      toast.error(message);
    }

    if (isSuccess || user) {
      // Navigates to home page URL with redux if success state is given from authSlice
      navigate("/");
      toast.success(
        // Toast success message shown
        "An activation email has been sent to your email. Please check your email"
      );
    }

    dispatch(reset()); // Resets all states from authService
  }, [isError, isSuccess, user, navigate, dispatch]);

  return (
    <>
      {/* Container for the registration form */}
      <div className="container auth__container">
        {/* Title for the registration form */}
        <h1 className="main__title">
          Register <BiUser />{" "}
        </h1>

        {/* Displaying a spinner if the registration is in progress */}
        {isLoading && <Spinner />}

        {/* Registration form */}
        <form className="auth__form">
          {/* Input field for First Name */}
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            onChange={handleChange} // Calls the handleChange function to update the state with the entered value
            value={first_name} // Sets input value into a React controllable state used in userData
            required
          />

          {/* Input field for Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            onChange={handleChange} // Calls upon handle change event to update the current form data and therefore the current state/event
            value={last_name} // Sets input value into a React controllable state used in userData
            required
          />

          {/* Input field for Email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange} // Calls upon handle change event to update the current form data and therefore the current state/event
            value={email} // Turns value into a React controllable state
            required
          />

          {/* Input field for Password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange} // Calls upon handle change event to update the current form data and therefore the current state/event
            value={password} // Sets input value into a React controllable state
            required
          />

          {/* Input field to re-enter the Password */}
          <input
            type="password"
            placeholder="Retype Password"
            name="re_password"
            onChange={handleChange} // Calls upon handle change event to update the current form data and therefore the current state/event
            value={re_password} // Sets input value into a React controllable state
            required
          />

          {/* Button to submit the registration form */}
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit} // Calls the handleSubmit function when the button is clicked
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
