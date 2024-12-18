import {configureStore} from "@reduxjs/toolkit";
import  rootReducer  from '../redux/reducer.js';
// import userReducer from './redux/userSlice';

const store = configureStore({
    reducer: rootReducer,
});

const {dispatch} = store;

export {store, dispatch};