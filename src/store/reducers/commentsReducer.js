import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   commentsList: []
}

const commentsSlice = createSlice({
   initialState,
   name: 'comments',
   reducers: {},
})

export default commentsSlice.reducer