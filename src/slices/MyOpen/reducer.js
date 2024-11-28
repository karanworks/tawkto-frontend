import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getOpenChats } from "./thunk";

export const initialState = {
  openChats: [],
  error: "",
};

const myOpenSlice = createSlice({
  name: "myOpen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOpenChats.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        console.log("GOT OPEN CHATS ->", action.payload.data);

        // state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });
  },
});

export default myOpenSlice.reducer;
