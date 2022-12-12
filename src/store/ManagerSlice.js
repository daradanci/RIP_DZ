import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {ErrorMessage, IP4, LoadingMessage, SuccessMessage} from "./pref";

export const fetchManagerBags = createAsyncThunk(
    'manager/fetchManagerBag',
    async () => {
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios(`${IP4}old_bags`,config);
        return response.data
    }
)

export const fetchClientBags = createAsyncThunk(
    'manager/fetchClientBags',
    async (userId) => {
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios(`${IP4}old_bags?user=${userId}`,config);
        return response.data
    }
)
export const filterClientBags = createAsyncThunk(
    'manager/filterClientBags',
    async (params) => {
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        let requestString=`${IP4}old_bags?`
        if(params['clientId']!=='null'){
            requestString+=`user=${params['clientId']}&`
        }
        if(params['status']!==0){
            requestString+=`status=${params['status']}&`
        }
        if(params['startDate']!==null&&params['endDate']!==null){
            requestString+=`startDate=${params['startDate']}&endDate=${params['endDate']}&`
        }
            const response = await axios(
                // `${IP4}old_bags?user=${params['clientId']}&status=${params['status']}&startDate=${params['startDate']}&endDate=${params['endDate']}}`
                requestString
                ,config);

        return response.data
    }
)
export const fetchManagerClients = createAsyncThunk(
    'manager/fetchManagerClients',
    async () => {
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios(`${IP4}client/`,config);
        return response.data
    }
)
export const fetchManagerClient = createAsyncThunk(
    'manager/fetchManagerClient',
    async (clientId) => {
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios(`${IP4}client/${clientId}`,config);
        return response.data
    }
)
export const fetchBagStates = createAsyncThunk(
    'manager/fetchBagStates',
    async () => {
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios(`${IP4}state/`,config);
        return response.data
    }
)
export const putBag = createAsyncThunk(
    'manager/putBag',
    async (data) => {
        const headers={
            Authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
        console.log('PUT!!!')
        console.log(data)
        const response = await axios.put(`${IP4}bag/${data.bagid}/`,data, {headers});
        return response.data
    }
)
export const managerSlice = createSlice({
    name: "managerSlice",
    initialState: {
        managerBags:[],
        managerClients:[],
        managerClient:{},
        managerStatus:LoadingMessage,
        managerError:null,
        bagStates:[],

    },
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchManagerBags.pending, (state, action) => {
                state.managerStatus = LoadingMessage
            })
            .addCase(fetchManagerBags.fulfilled, (state, action) => {
                // Add user to the state array
                state.managerBag=action.payload
                state.managerStatus = SuccessMessage
                console.log('managerBag:')
                console.log(state.managerBag)

            })
            .addCase(fetchManagerBags.rejected, (state, action) => {
                state.managerStatus = ErrorMessage
                state.managerError = action.error.message
            })
        .addCase(fetchManagerClients.pending, (state, action) => {
                state.managerStatus = LoadingMessage
            })
            .addCase(fetchManagerClients.fulfilled, (state, action) => {
                // Add user to the state array
                state.managerClients=action.payload
                state.managerStatus = SuccessMessage
                // console.log('our clients:')
                // console.log(state.managerClients)
            })
            .addCase(fetchManagerClients.rejected, (state, action) => {
                state.managerStatus = ErrorMessage
                state.managerError = action.error.message
                console.log(`ERROR: ${state.managerError}`)
            })
            .addCase(fetchManagerClient.fulfilled, (state, action) => {
                // Add user to the state array
                state.managerClient=action.payload
                state.managerStatus = SuccessMessage
                // console.log('our clients:')
                // console.log(state.managerClients)
            })
        .addCase(fetchClientBags.fulfilled, (state, action) => {
                // Add user to the state array
                state.managerBags=action.payload
                state.managerStatus = SuccessMessage
                console.log('client bags:')
                console.log(state.managerBags)
            })
            .addCase(filterClientBags.fulfilled, (state, action) => {
                // Add user to the state array
                state.managerBags=action.payload
                state.managerStatus = SuccessMessage
                console.log('client bags:')
                console.log(state.managerBags)
            })
        .addCase(fetchBagStates.fulfilled, (state, action) => {
                // Add user to the state array
                state.bagStates=action.payload
                state.managerStatus = SuccessMessage
                console.log('client bags:')
                console.log(state.bagStates)

            })
    },
});


// Action creators are generated for each case reducer function
// export const { fetchProducts1} = contactSlice.actions;

export default managerSlice.reducer;
