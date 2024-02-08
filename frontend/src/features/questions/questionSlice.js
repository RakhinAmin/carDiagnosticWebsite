// brakeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import brakeService from './brakeService';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const recordBrakeResponse = createAsyncThunk(
    'brake/recordResponse',
    async (response, thunkAPI) => {
        try {
            const result = await brakeService.recordBrakeResponse(response);
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const brakeSlice = createSlice({
    name: 'brake',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(recordBrakeResponse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(recordBrakeResponse.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'Brake response recorded successfully';
            })
            .addCase(recordBrakeResponse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = brakeSlice.actions;
export default brakeSlice.reducer;
