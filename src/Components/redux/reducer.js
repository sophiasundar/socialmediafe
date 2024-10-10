import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './userSlice.js';
import themeSlice from "./theme.js";
import postSlice from './postSlice.js';
import scrollSlice from './scrollSlice.js'

const rootReducer =  combineReducers({
    user: userSlice,
    theme: themeSlice,
    posts: postSlice,
    scroll: scrollSlice,
});

export default rootReducer;