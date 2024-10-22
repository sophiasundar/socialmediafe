import { createSlice } from "@reduxjs/toolkit";


const scrollSlice = createSlice({
    name: 'scroll',
    initialState: {
        scrollY: 0,
        scrollX: 0,
    },
    reducers: {
        updateScrollPosition: ( state, action ) =>{
            state.scrollY = action.payload.scrollY;
              state.scrollX = action.payload.scrollX;
        },
    },
});

export const updateScrollPosition = scrollSlice.actions.updateScrollPosition;

export default scrollSlice.reducer;