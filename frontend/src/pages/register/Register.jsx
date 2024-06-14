import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import backgroundImage from "../../assets/register_images/hondansx.jpg";

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
      <div
        className="register_container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          className="inner_container"
          style={{
            backgroundColor: "#24242a",
            width: "70vw",
            height: "40vw",
            borderRadius: "30px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
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
            <img
              src={backgroundImage}
              alt="Background"
              className="register_image"
              style={{
                display: "flex",
                borderRadius: "30px 0 0 30px",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div style={{ justifyContent: "flex-end", width: "45%" }}>
            <h1
              className="register_title"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
                fontSize: "4vh",
                fontFamily: "lora",
                color: "white",
              }}
            >
              Welcome!
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
              Please enter new credentials
            </h2>
            {/* Form for first name */}
            <form
              className=""
              style={{
                alignItems: "center",
                padding: 0,
                backgroundColor: "white",
                display: "flex",
                width: "85%",
                borderRadius: "10px",
                justifyContent: "flex-start",
                marginBottom: "5vh",
              }}
            >
              <input
                type="text"
                placeholder="First name"
                name="first_name"
                onChange={handleChange}
                value={first_name}
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
            {/* Form for last name */}
            <form
              className=""
              style={{
                alignItems: "center",
                padding: 0,
                backgroundColor: "white",
                display: "flex",
                width: "85%",
                borderRadius: "10px",
                justifyContent: "flex-start",
                marginBottom: "5vh",
              }}
            >
              <input
                type="text"
                placeholder="Last name"
                name="last_name"
                onChange={handleChange}
                value={last_name}
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
            {/* Form for email */}
            <form
              className=""
              style={{
                alignItems: "center",
                padding: 0,
                backgroundColor: "white",
                display: "flex",
                width: "85%",
                borderRadius: "10px",
                justifyContent: "flex-end",
                marginBottom: "5vh",
              }}
            >
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
            {/* Form for password */}
            <form
              className=""
              style={{
                alignItems: "center",
                padding: 0,
                backgroundColor: "white",
                display: "flex",
                width: "85%",
                borderRadius: "10px",
                justifyContent: "flex-end",
                marginBottom: "5vh",
              }}
            >
              <input
                type="text"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={password}
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
            {/* Form for retype password */}
            <form
              className=""
              style={{
                alignItems: "center",
                padding: 0,
                backgroundColor: "white",
                display: "flex",
                width: "85%",
                borderRadius: "10px",
                justifyContent: "flex-end",
                marginBottom: "5vh",
              }}
            >
              <input
                type="text"
                placeholder="Retype password"
                name="re_password"
                onChange={handleChange}
                value={re_password}
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
            {/* Submit button for user registration */}
            <button
              className="register_button"
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
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
