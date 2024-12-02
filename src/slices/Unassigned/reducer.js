import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUnassignedChats } from "./thunk";

export const initialState = {
  unassignedChats: [],
  error: "",
};

const unassignedSlice = createSlice({
  name: "unassigned",
  initialState,
  reducers: {
    // joinUnassignedChat: (state, action) => {
    //   console.log("JOIN ASSIGNED CHAT REDUCER ->", action.payload);
    //   state.unassignedChats = state.unassignedChats.filter(
    //     (chat) => chat.id !== action.payload
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getUnassignedChats.fulfilled, (state, action) => {
      if (action.payload?.status === "failure") {
        state.error = action.payload.message;
      } else {
        console.log("UNASSIGNED CHAT REDUCER ->", action.payload);

        state.unassignedChats = action.payload?.data;
        state.error = "";
      }
    });
  },
});

// export const { joinUnassignedChat } = unassignedSlice.actions;

export default unassignedSlice.reducer;
