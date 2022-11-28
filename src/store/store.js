import { configureStore } from "@reduxjs/toolkit";
import rangeReducer from './RangeSlice';
import modelReducer from './ModelSlice'

export default configureStore({
    reducer: {
        range:rangeReducer,
        rangeStatus:rangeReducer,
        rangeError: rangeReducer,
        rangeElement:rangeReducer,
        models:modelReducer,
        modelStatus:modelReducer,
        modelError:modelReducer,
        model:modelReducer,
        maxPrice:modelReducer,
        minPrice:modelReducer,
        maxBorder:modelReducer,
        minBorder:modelReducer,
        search_input: modelReducer,
        isOpen: modelReducer,
    },
});
