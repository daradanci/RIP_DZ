import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {IP4} from "./pref";

export const fetchModels = createAsyncThunk(
    'models/fetchModels',
    async (rangeId) => {
        const response = await axios(`${IP4}range/${rangeId}/models/`);
        return response.data
    }
)
export const fetchPrices=createAsyncThunk(
    'models/fetchPrices',
    async (rangeId) => {
        const response = await axios(`${IP4}range/${rangeId}/min_max_price/`);
        return response.data
    }
)

export const modelSlice = createSlice({
    name: "modelSlice",
    initialState: {
        models:[],
        modelStatus:'loading',
        modelError:null,
        model:null,
        maxPrice:0,
        minPrice:0,
        maxBorder:0,
        minBorder:0,
        search_input: '',
        isOpen: true,

    },
    reducers: {
        updatePrices: (state, action) => {
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
        },
        updateSearchValue: (state, action) => {
            state.search_input = action.payload;
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchModels.pending, (state, action) => {
                state.modelStatus = 'loading'
            })
            .addCase(fetchModels.fulfilled, (state, action) => {
                // Add user to the state array
                state.models=action.payload
                state.modelStatus = 'succeeded'

            })
            .addCase(fetchModels.rejected, (state, action) => {
                state.modelStatus = 'failed'
                state.modelError = action.error.message

            })
            .addCase(fetchPrices.fulfilled, (state, action) => {
                // Add user to the state array
                state.maxPrice=action.payload[0].max.price__max
                state.minPrice=action.payload[0].min.price__min
                state.maxBorder=action.payload[0].max.price__max
                state.minBorder=action.payload[0].min.price__min
                // state.modelStatus = 'succeeded'

            })
    },
});


// Action creators are generated for each case reducer function
// export const { fetchProducts1} = contactSlice.actions;
export const { updatePrices, updateSearchValue,setIsOpen } = modelSlice.actions;

export default modelSlice.reducer;
