// authSlice handles authentication related states in the application
// Importing necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Importing authentication functions from authService module
import authService from "./authService";

// Retrieving user data from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Initial state for the authentication slice of the Redux store
const initialState = {
    user: user ? user : null, // Initial user state fetched from localStorage
    userInfo: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Async Thunks for handling asynchronous authentication operations using Redux Toolkit
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            // Invoking the authService.register function for user registration
            return await authService.register(userData);
        } catch (error) { // Checks whether error has response object and data property
            // Handling errors and rejecting with a value that includes an error message
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || 
                error.toString(); // Applies given error to a string
            return thunkAPI.rejectWithValue(message); // Uses redux middleware to output an action with an error message (taking from the redux store)
        }
    }
);

// Async Thunks for handling asynchronous authentication operations using Redux Toolkit
export const login = createAsyncThunk(
    // Action type for the login operation
    "auth/login",

    // Async function that performs the login operation
    async (userData, thunkAPI) => {
        try {
            // Call the login method from the authService with user data
            return await authService.login(userData);
        } catch (error) {
            // Handle errors and extract error message
            const message = (
                error.response && error.response.data && error.response.data.message
                ) || error.message || error.toString();

            // Reject the promise with the error message
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Define an asynchronous Redux thunk for the logout operation
export const logout = createAsyncThunk(
    // Action type for the logout operation
    "auth/logout",
    // Async function that performs the logout operation
    async () => {
        // Call the logout method from the authService
        authService.logout();
    }
)

// Async Thunks for handling asynchronous authentication operations using Redux Toolkit
export const activate = createAsyncThunk(
    // Action type for the activate operation
    "auth/activate",
    async (userData, thunkAPI) => {
        try {
            return await authService.activate(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Async Thunks for handling asynchronous authentication operations using Redux Toolkit
export const resetPassword = createAsyncThunk(
    // Action type for the resetPassword operation
    "auth/resetPassword",
    async (userData, thunkAPI) => {
        try {
            return await authService.resetPassword(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Async Thunks for handling asynchronous authentication operations using Redux Toolkit
export const resetPasswordConfirm = createAsyncThunk(
    // Action type for the resetPasswordConfirm operation
    "auth/resetPasswordConfirm",
    async (userData, thunkAPI) => {
        try {
            return await authService.resetPasswordConfirm(userData)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Async Thunks for handling asynchronous authentication operations using Redux Toolkit
export const getUserInfo = createAsyncThunk(
    // Action type for the getUserInfo operation
    "auth/getUserInfo",
    async (_, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await authService.getUserInfo(accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Async Thunks for handling asynchronous authentication operations using Redux Toolkit
export const authSlice = createSlice({
    name: "auth", // Name of the slice, used to generate action types
    initialState, // Initial state for the authentication slice of the Redux store
    // Reducers define how the state can be updated in response to actions
    reducers: {
        // Reset reducer sets specific state properties
        reset: (state) => {
            // Reset loading state to false
            state.isLoading = false;
            // Reset error state to false
            state.isError = false;
            // Reset success state to false
            state.isSuccess = false;
            // Reset message state to false
            state.message = false;
        }
    },
    extraReducers: (builder) => {
        // Handling different actions dispatched by the async thunks
        // Case for when the 'register' async thunk is in progress
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true // Set loading state to true
            })

            // Case for when the 'register' async thunk is successfully completed
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false; // Set loading state to false
                state.isSuccess = true; // Set success state to true
                state.user = action.payload; // Update user state with the payload from the action
            })
            // Case for when the 'register' async thunk encounters an error
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false; // Set loading state to false
                state.isSuccess = false; // Set success state to false
                state.isError = true; // Set error state to true
                state.message = action.payload; // Update message state with the error payload
                state.user = null; // Reset user state to null
            })
            // Case for when the 'login' async thunk is in progress
            builder.addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            // Case for when the 'login' async thunk is successfully completed
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            // Case for when the 'login' async thunk encounters an error
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload // Update message with login rejection payload
                state.user = null
            })
            // Case for when the 'logout' async thunk is successfully completed
            .addCase(logout.fulfilled, (state) => {
                state.user = null; // Reset user state to null
            })

            // Case for when the 'activate' async thunk is in progress
            builder.addCase(activate.pending, (state) => {
                state.isLoading = true;
            })
            // Case for when the 'activate' async thunk is successfully completed
            .addCase(activate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })

            // Case for when the 'activate' async thunk encounters an error
            .addCase(activate.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload; // Update message with rejection payload
                state.user = null;
            })

            // Case for when the 'resetPassword' async thunk is in progress
            builder.addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })

            // Case for when the 'resetPassword' async thunk is successfully completed
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })

            // Case for when the 'resetPassword' async thunk encounters an error
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

            // Similar cases for other async thunks like 'resetPasswordConfirm', 'getUserInfo', etc.

            // Case for when the 'resetPasswordConfirm' async thunk is in progress
            builder.addCase(resetPasswordConfirm.pending, (state) => {
                state.isLoading = true;
            })

            // Case for when the 'resetPasswordConfirm' async thunk is successfully completed
            .addCase(resetPasswordConfirm.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })

            // Case for when the 'resetPasswordConfirm' async thunk encounters an error
            .addCase(resetPasswordConfirm.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload; // Update message with rejection payload
                state.user = null;
            })

            // Case for when the 'getUserInfo' async thunk is successfully completed
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload; // Update userInfo state with the payload from the action
            })
    }
})




export const { reset } = authSlice.actions // Extract reset action at the end of the cases for use in other redux parts of the code

export default authSlice.reducer