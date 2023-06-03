import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./reducers/commentsReducer";


export const store = configureStore({
   reducer: {
      comments: commentsReducer
   }
})