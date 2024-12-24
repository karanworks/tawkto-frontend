import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUnassignedChats, getChatRequestMessages } from "./thunk";

export const initialState = {
  unassignedChats: [],
  error: "",
};

const unassignedSlice = createSlice({
  name: "unassigned",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUnassignedChats.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(getChatRequestMessages.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });
  },
});

// export const { joinUnassignedChat } = unassignedSlice.actions;

export default unassignedSlice.reducer;
