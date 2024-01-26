// Importing React library for creating React components
import { useEffect } from "react";

// Importing BiUserCheck icon from react-icons/bi
import { BiUserCheck } from "react-icons/bi";

// Importing necessary hooks and components from React and React Router
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Importing actions from the authSlice for activating and resetting the state
import { activate, reset } from "../../features/auth/authSlice";

// Importing toast for displaying notifications
import { toast } from "react-toastify";

// Importing Spinner component for indicating loading state
import Spinner from "../../components/Spinner";

// Defining a functional component named ActivatePage
const ActivatePage = () => {
  // Destructuring uid and token parameters from the URL (user unique id and authentication token)
  const { uid, token } = useParams();

  // Creating dispatch function to dispatch actions from authSlice
  const dispatch = useDispatch();

  // Creating navigate function for navigating between page URL's
  const navigate = useNavigate();

  // Extracting relevant data from authSlice using useSelector
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Handling the form submission
  const handleSubmit = (e) => {
    // Preventing the default page refresh
    e.preventDefault();

    // Creating userData object with uid and token that were extracted from URL parameters
    const userData = {
      uid,
      token,
    };

    // Dispatching the activate action with userData as the parameter
    dispatch(activate(userData));

    // Displaying a success toast message
    toast.success("Your account has been activated! You can log in now");
  };

  // useEffect hook to handle errors
  useEffect(() => {
    // Checking if there is an error and displaying an error toast message
    if (isError) {
      toast.error(message);
    }

    // Checking if activation was successful and navigating to the login page URL
    if (isSuccess) {
      navigate("/login");
    }

    // Resetting the auth state to clear any previous state
    dispatch(reset());
  }, [isError, isSuccess, navigate, dispatch]);

  // Representing a container for the content of the ActivatePage component
  return (
    <div>
      <div className="container auth__container">
        {/* Displaying a heading with a title and a BiUserCheck icon */}
        <h1 className="main__title">
          Activate Account <BiUserCheck />{" "}
        </h1>

        {/* Displaying Spinner component if the page is in a loading state */}
        {isLoading && <Spinner />}

        {/* Creating a button to activate the account */}
        <button
          className="btn btn-accent btn-activate-account"
          type="submit"
          onClick={handleSubmit} // Calls the handleSubmit function when the button is clicked
        >
          Activate Account
        </button>
      </div>
    </div>
  );
};

export default ActivatePage;
