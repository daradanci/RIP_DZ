import { configureStore } from "@reduxjs/toolkit";
import rangeReducer from './RangeSlice';
import modelReducer from './ModelSlice';
import userReducer from './UserSlice';
import managerReducer from './ManagerSlice';

export default configureStore({
    reducer: {
        // RANGE
        range:rangeReducer,
        rangeStatus:rangeReducer,
        rangeError: rangeReducer,
        rangeElement:rangeReducer,
        // MODELS
        models:modelReducer,
        allModels:modelReducer,
        modelStatus:modelReducer,
        modelError:modelReducer,
        model:modelReducer,
        maxPrice:modelReducer,
        minPrice:modelReducer,
        maxBorder:modelReducer,
        minBorder:modelReducer,
        search_input: modelReducer,
        isOpen: modelReducer,
        producers:modelReducer,

        // USER
        username:userReducer,
        password:userReducer,
        email:userReducer,
        userStatus:userReducer,
        userError:userReducer,
        access: userReducer,
        refresh: userReducer,
        refreshRequired: userReducer,
        formUsername: userReducer,
        formPassword: userReducer,
        dateJoined: userReducer,
        user:userReducer,
        isStaff:userReducer,
        isUser:userReducer,

        // MANAGER
        managerBags:managerReducer,
        managerClients:managerReducer,
        managerClient:managerReducer,
        bagStates: managerReducer,

    },
});
