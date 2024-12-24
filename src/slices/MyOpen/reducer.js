import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getOpenChats, getOpenChatMessages } from "./thunk";

export const initialState = {
  openChats: [],
  activeOpenChat: null,
  error: "",
};

const myOpenSlice = createSlice({
  name: "myOpen",
  initialState,
  reducers: {
    handleOpenActiveChat(state, action) {
      console.log("ACTIVE CHAT STATE IN REDUX->", action.payload);
      state.activeOpenChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOpenChats.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        // state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(getOpenChatMessages.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        // state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });
  },
});

export const { handleOpenActiveChat } = myOpenSlice.actions;
export default myOpenSlice.reducer;
