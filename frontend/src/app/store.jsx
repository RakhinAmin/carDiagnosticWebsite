// Importing the configureStore function from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing the authReducer from the authSlice file
import authReducer from "../features/auth/authSlice";

// Will add on reducers for different services as needed

// Creating a Redux store
export const store = configureStore({
  // Specifying the reducers for the store
  reducer: {
    // Associating the 'auth' slice with the 'authReducer'
    auth: authReducer,
  },
});
