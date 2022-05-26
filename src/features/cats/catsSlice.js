import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Action Creators

// async actions
export const fetchCats= createAsyncThunk("cats/fetchCats", ()=> {
    return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
      .then((response) => response.json())
      .then((data) => data.images);
})

// sync actions added for demo purposes, they are generated by createSlice automatically
/* export function catAdded(newCat) {
  return {
    type: "cats/catAdded",
    payload: newCat,
  };
}

export function catUpdated(updatedCat) {
  return {
    type: "cats/catUpdated",
    payload: updatedCat,
  };
} */

// Reducer
const catsSlice = createSlice({
  name: "cats",
  initialState: {
    entities: [],
    status: "idle",
  },
  reducers: {
    catAdded(state,action){
      //using createSlice lets us muatate state!
      state.entities.push(action.payload);
    },
    catUpdated(state,action){
      const cat = state.entities.find((cat)=> cat.id === action.payload.id);
      cat.url = action.payload.url
    },
  },
    //async actions
    extraReducers: {
      //handles async action types: pending, fulfilled, rejected(for errors)
      [fetchCats.pending](state){
        state.status = "loading";
      },
      [fetchCats.fulfilled](state, action){
        state.entities = action.payload;
        state.status = "idle";
      },
    },
})

export const {catAdded, catUpdated} = catsSlice.actions;
export default catsSlice.reducer;
