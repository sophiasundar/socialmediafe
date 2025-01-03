import {configureStore} from "@reduxjs/toolkit";
import  rootReducer  from '../redux/reducer.js';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),   
      
});

const {dispatch} = store;

export {store, dispatch};