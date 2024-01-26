// authService is a module created to handle authentication function tasks

import axios from "axios"; // import axios library to interact with the django backend using POST and GET

// Define the base URL for the Django backend
const BACKEND_DOMAIN = "http://localhost:8000";

// Define the URL for user registration
const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/`;

// Define the URL for user login (JWT authentication)
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`;

// Define the URL for user account activation
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`;

// Define the URL for initiating the password reset process
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`;

// Define the URL for confirming the password reset
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`;

// Define the URL for getting user information
const GET_USER_INFO = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`;

// Function to register a user
const register = async (userData) => { //async is used to create an asynchronous process that can be run concurrently with other processes
    const config = {
        headers: {
            "Content-type": "application/json", // Part of the HTTP request that contains metadata about the userData request, formatting is as JSON
        },
    };

    console.log('Request Payload:', userData); // Debug to check that the correct user data is being given
    const response = await axios.post(REGISTER_URL, userData, config); // Post request with the provided user data to the Register URL
    // Await used to pause the function processes until the post request promise is fulfilled (visualised by the website refreshing only AFTER the user data is validated) 

    return response.data; // Returns the response data from the backend server to be used
};

// // Function to login a user
const login = async (userData) => { //async is used to create an asynchronous process that can be run concurrently with other processes
    const config = {
        headers: {
            "Content-type": "application/json", // Part of the HTTP request that contains metadata about the userData request, formatting is as JSON
        },
    };

    const response = await axios.post(LOGIN_URL, userData, config); // Post request with the provided user data to the Login URL

    if (response.data) { // Checks if the Post request response contains data (jwt authentication token provided by the server)
        localStorage.setItem("user", JSON.stringify(response.data)); // The user data (authentication token) is stored in the browsers storage
    }

    return response.data;
};

// Function to logout a User
const logout = () => {
    return localStorage.removeItem("user"); // Removes the user data from the local storage
};

// Function to activate a user
const activate = async (userData) => { //async is used to create an asynchronous process that can be run concurrently with other processes
    const config = {
        headers: {
            "Content-type": "application/json", // Part of the HTTP request that contains metadata about the userData request, formatting is as JSON
        },
    };

    const response = await axios.post(ACTIVATE_URL, userData, config); // Post request with the provided user data to the Activation URL

    return response.data;
};

// Reset Password
const resetPassword = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const response = await axios.post(RESET_PASSWORD_URL, userData, config); // Post request with the provided user data to the reset oassword URL

    return response.data;
};

// Reset Password
const resetPasswordConfirm = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config); // Post request with the provided user data to the reset password confirm URL

    return response.data;
};

// Get User Info
const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Collects access token and uid into the header
        },
    };

    const response = await axios.get(GET_USER_INFO, config); // Post request with the access token data

    return response.data;
};

const authService = { register, login, logout, activate, resetPassword, resetPasswordConfirm, getUserInfo }; // Groups all authentication functions into a single object

export default authService; // Exporting authentication object so that it can be imported when needed in other files
