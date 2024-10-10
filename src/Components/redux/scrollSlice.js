import { createSlice } from "@reduxjs/toolkit";


const scrollSlice = createSlice({
    name: 'scroll',
    initialState: {
        scrollY: 0,
    },
    reducers: {
        updateScrollPosition: ( state, action ) =>{
            state.scrollY = action.payload;
        },
    },
});

export const updateScrollPosition = scrollSlice.actions.updateScrollPosition;

export default scrollSlice.reducer;