import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {ErrorMessage, SuccessMessage, LoadingMessage, IP4} from "./pref";

export const fetchModels = createAsyncThunk(
    'models/fetchModels',
    async (rangeId, deep=false) => {
        const config={
            headers:{
                Authorization:localStorage.getItem('userId')
            }
        }
        if(deep){
        const response = await axios(`${IP4}range/${rangeId}/models?deep`, config);
        return response.data

        }
        else{

        const response = await axios(`${IP4}range/${rangeId}/models/`, config);
        return response.data
        }
    }
)

export const fetchAllModels = createAsyncThunk(
    'models/fetchAllModels',
    async (rangeId) => {
        const config={
            headers:{
                Authorization:localStorage.getItem('userId')
            }
        }
        const response = await axios(`${IP4}models/`, config);
        return response.data
    }
)
export const fetchModel = createAsyncThunk(
    'models/fetchModel',
    async (params, deep=false) => {
        const config={
            headers:{
                Authorization:localStorage.getItem('userId')
            }
        }
        if (deep){
            const response = await axios(`${IP4}range/${params['rangeId']}/models/${params['modelId']}/?deep`, config);
        return response.data
        }
        else{
            const response = await axios(`${IP4}range/${params['rangeId']}/models/${params['modelId']}`, config);
        return response.data
        }
    }
)
export const fetchPrices=createAsyncThunk(
    'models/fetchPrices',
    async (rangeId) => {
        const config={
            headers:{
                Authorization:localStorage.getItem('userId')
            }
        }
        const response = await axios(`${IP4}range/${rangeId}/min_max_price/`, config);
        return response.data
    }
)
export const fetchProducers = createAsyncThunk(
    'models/fetchProducers',
    async () => {
        const config={
            headers:{
                Authorization:localStorage.getItem('userId')
            }
        }
        const response = await axios(`${IP4}producer/`, config);
        return response.data
    }
)
export const modelSlice = createSlice({
    name: "modelSlice",
    initialState: {
        models:[],
        allModels:[],
        modelStatus:'loading',
        modelError:null,
        model:null,
        maxPrice:0,
        minPrice:0,
        maxBorder:0,
        minBorder:0,
        search_input: '',
        isOpen: true,
        producers:[],

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
            .addCase(fetchAllModels.fulfilled, (state, action) => {
                // Add user to the state array
                state.allModels=action.payload
            })
            .addCase(fetchModels.pending, (state, action) => {
                state.modelStatus = LoadingMessage
            })
            .addCase(fetchModels.fulfilled, (state, action) => {
                // Add user to the state array
                state.models=action.payload
                state.modelStatus = SuccessMessage
                console.log('MODELS FETCHED')
                console.log(state.models)
            })
            .addCase(fetchModels.rejected, (state, action) => {
                state.modelStatus = ErrorMessage
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
            .addCase(fetchModel.pending, (state, action) => {
                state.modelStatus = LoadingMessage
            })
            .addCase(fetchModel.fulfilled, (state, action) => {
                // Add user to the state array
                state.model=action.payload
                state.modelStatus = SuccessMessage
            })
            .addCase(fetchModel.rejected, (state, action) => {
                state.modelStatus = ErrorMessage
                state.modelError = action.error.message
            })
            .addCase(fetchProducers.fulfilled, (state, action) => {
                // Add user to the state array
                state.producers=action.payload
                console.log(`PRODUCERS: ${state.producers}`)
            })
    },
});

// Action creators are generated for each case reducer function
// export const { fetchProducts1} = contactSlice.actions;
export const { updatePrices, updateSearchValue,setIsOpen } = modelSlice.actions;

export default modelSlice.reducer;
