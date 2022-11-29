import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {ErrorMessage, IP4, LoadingMessage, SuccessMessage} from "./pref";

export const fetchRange = createAsyncThunk(
    'range/fetchRange',
    async () => {
        const response = await axios(`${IP4}range`);
        return response.data
    }
)

export const fetchRangeElement = createAsyncThunk(
    'range/fetchRangeElement',
    async (rangeId) => {
        const response = await axios(`http://127.0.0.1:8000/range/${rangeId}/`);
        return response.data
    }
)
export const rangeSlice = createSlice({
    name: "rangeSlice",
    initialState: {
        range:[],
        rangeStatus:'loading',
        rangeError:null,
        rangeElement:null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchRange.pending, (state, action) => {
                state.rangeStatus = LoadingMessage
            })
            .addCase(fetchRange.fulfilled, (state, action) => {
                // Add user to the state array
                state.range=action.payload
                state.rangeStatus = SuccessMessage

            })
            .addCase(fetchRange.rejected, (state, action) => {
                state.rangeStatus = ErrorMessage
                state.rangeError = action.error.message

            })
            .addCase(fetchRangeElement.pending, (state, action) => {
                state.rangeStatus = LoadingMessage
            })
            .addCase(fetchRangeElement.fulfilled, (state, action) => {
                // Add user to the state array
                state.rangeElement=action.payload
                state.rangeStatus = SuccessMessage

            })
            .addCase(fetchRangeElement.rejected, (state, action) => {
                state.rangeStatus = ErrorMessage
                state.rangeError = action.error.message

            })
    },
});


// Action creators are generated for each case reducer function
// export const { fetchProducts1} = contactSlice.actions;

export default rangeSlice.reducer;
