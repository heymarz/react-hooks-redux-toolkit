import { configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from "redux"

import catsReducer from "./features/cats/catsSlice";

const store = configureStore({
  reducer: {
    cats: catsReducer,
  },
});

export default store;
