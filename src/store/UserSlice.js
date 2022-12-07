import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {IP4, ErrorMessage, SuccessMessage, LoadingMessage} from "./pref";
import {fetchModels} from "./ModelSlice";

export const addUser = createAsyncThunk(
    'users/addUser',
    async (newUser) => {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: newUser.username,
                email:newUser.email,
                password: newUser.password,
            })
        };
        console.log(newUser)
        const response = await axios.post(`${IP4}add_user`, requestOptions);
        return response.data
    }
)

export const tryLogging = createAsyncThunk(
    'users/tryLogging',
    async (access) => {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${access}`,
            },
        };
        console.log(`TRYING LOGGING VIA ACCESS: ${access}`)
        const response = await axios(`${IP4}api/user`, requestOptions);
        return response.data
    }
)

export const refreshToken = createAsyncThunk(
    'users/refreshToken',
    async (refresh) => {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ refresh })
        };
        console.log(`TOKEN REFRESHING: ${refresh}`)
        const response = await axios.post(`${IP4}api/token/refresh`, requestOptions);
        return response.data
    }
)

// export const obtainToken = createAsyncThunk(
//     'users/obtainToken',
//     async (formUser) => {
//         console.log(formUser)
//         const requestOptions = {
//             url:`${IP4}api/token/obtain`,
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//             },
//             data: {
//                 // username: formUser.username,
//                 // password: formUser.password,
//                 username: "dante",
//                 password: "123",
//             }
//         };
//         const response = await axios.request(requestOptions);
//         return response.data
//     }
// )


export const userInfo = createAsyncThunk(
    'users/userInfo',
    async (userId) => {
        const config={
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios(`${IP4}client/${userId}`, config);
        return response.data
    }
)


export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        username:'',
        password:'',
        email:'',
        userStatus:'loading',
        userError:null,
        access: localStorage.getItem('accessToken'),
        refresh: localStorage.getItem('refreshToken'),
        refreshRequired: false,
        formUsername: null,
        formPassword: null,
        dateJoined: '',
        user: null,
        isStaff:false,
        isUser:false,

    },
    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
            console.log(`NEW USERNAME: ${state.username}`)
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
            console.log(`NEW EMAIL: ${state.email}`)
        },
        updatePassword: (state, action) => {
            state.password = action.payload;
            console.log(`NEW PASSWORD: ${state.password}`)
        },
        setAccess: (state, action) => {
            state.access = action.payload;
            console.log(`NEW ACCESS: ${state.access}`)
        },
        setRefresh: (state, action) => {
            state.refresh = action.payload;
            console.log(`NEW REFRESH: ${state.refresh}`)
        },
        setRefreshRequired: (state, action) => {
            state.refreshRequired = action.payload;
            console.log(`NEW REFRESH REQUIRED: ${state.refreshRequired}`)
        },
        setFormUsername: (state, action) => {
            state.formUsername = action.payload;
            console.log(`NEW formUsername: ${state.formUsername}`)
        },
        setFormPassword: (state, action) => {
            state.formPassword = action.payload;
            console.log(`NEW formPassword: ${state.formPassword}`)
        },
        setDateJoined: (state, action) => {
            state.dateJoined = action.payload;
            console.log(`NEW formPassword: ${state.dateJoined}`)
        },
        setUserStatus: (state, action) => {
            state.userStatus = action.payload;
            console.log(`NEW USERSTATUS: ${state.userStatus}`)
        },
        setUserError: (state, action) => {
            state.userError = action.payload;
            console.log(`NEW USERERROR: ${state.userError}`)
        },
        checkIfStaff: (state, action) => {
            state.isStaff = state.user.is_staff;
            console.log(`IS STAFF: ${state.isStaff}`)
        },
        updateIfStaff: (state, action) => {
            state.isStaff = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state, action) => {
                // state.modelStatus = 'loading'
            })
            .addCase(addUser.fulfilled, (state, action) => {
                // Add user to the state array
                // state.models=action.payload
                state.userStatus = SuccessMessage
            })
            .addCase(addUser.rejected, (state, action) => {
                state.userStatus = ErrorMessage
                state.userError = action.error.message
            })
        .addCase(userInfo.fulfilled, (state, action) => {
                // Add user to the state array
            state.user=action.payload
            state.userStatus = SuccessMessage
            state.isStaff=action.payload.is_staff
            // console.log('USER INFO:')
            // console.log(state.user)
            // console.log(`is staff: ${state.isStaff}`)
            })

    },
});


// Action creators are generated for each case reducer function
// export const { fetchProducts1} = contactSlice.actions;
export const { updateUsername, updatePassword, updateEmail, setAccess, setFormPassword,
    setDateJoined, setRefreshRequired, setRefresh, setFormUsername,
    setUserStatus, setUserError, checkIfStaff, updateIfStaff } = userSlice.actions;

export default userSlice.reducer;
